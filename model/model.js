var Model = {};

var Product = require('./product');
var Item = require('./item');
var Cart = require('./cart');
var Order = require('./order');
var User = require('./user')

Model.user = null;

Model.getProducts = function () {
    return Product.find();
};

Model.getProduct = function (pid) {
    return Product.findById(pid);
};

Model.getShoppingCart = function (uid) {
    return User.findById(uid)
        .then(user => {
            return Cart.findById(user.cart).populate({
                path: 'items',
                model: 'CartItem',
                populate: {
                    path: 'product',
                    model: 'Product'
                }
            })
        });
};

Model.cartItemCount = function (uid) {
    return User.findById(uid).populate('cart')
        .then(user => {
            return user.cart.items.length;
        })
};

Model.signin = function (credentials) {
    return new Promise(function (resolve, reject) {
        for (let user of Model.users) {
            if (user.email == credentials.email) {
                if (user.password == credentials.password) {
                    resolve(Model.user = user.id);
                }
                else reject("PASSWORD_NOT_MATCHING")
            }
        }
        reject("USER_NOT_FOUND")
    });
};

Model.signout = function () {
    return new Promise(function (resolve, reject) {
        Model.user = null;
        resolve(Model.user);
    });
}

Model.signup = function (new_user) {
    return User.findOne({ email: new_user.email })
        .then(user => {
            if (user != null) {
                return Promise.reject("Ya hay un usuario registrado con esta dirección de correo electrónico.");
            } else {
                return new Cart().save().then(cart => {
                    return User({
                        name: new_user.name,
                        surname: new_user.surname,
                        email: new_user.email,
                        birth: new_user.birth,
                        address: new_user.address,
                        password: new_user.password,
                        cart: cart,
                        orders: [],
                    }).save()
                })
            }
        });
};

Model.checkout = function (uid, order) {
    return User.findById(uid).populate({
        path: 'cart',
        model: 'Cart',
        populate: {
            path: 'items',
            model: 'CartItem'
        }
    })
        .then(user => {
            return new Order({
                items: user.cart.items,
                subtotal: user.cart.subtotal,
                tax: user.cart.tax,
                total: user.cart.total,
                address: order.address,
                cardHolder: order.cardHolder,
                cardNumber: order.cardNumber,
                date: Date.now()
            }).save()
                .then(order => {
                    user.orders.push(order)
                    return user.save()
                        .then(user => {
                            return Cart.findOne(user.cart)
                                .then(cart => {
                                    cart.items = [];
                                    cart.total = 0;
                                    cart.subtotal = 0;
                                    return cart.save();
                                })
                        })
                        .then(() => {
                            return order;
                        });
                })
        })

    return new Promise(function (resolve, reject) {
        var promises = [Model.getShoppingCart(), Model.getLoggedUser()]
        Promise.all(promises)
            .then(function ([cart, user]) {
                order.id = Date.now();
                order.items = cart.items;
                order.subtotal = cart.subtotal;
                order.tax = cart.tax;
                order.total = cart.total;

                user.orders.push(order);
                user.shopping_cart = {
                    items: [],
                    total: 0,
                    subtotal: 0,
                    tax: cart.tax
                };
                resolve(order.id);
            });
    });
};

Model.getOrder = function (oid) {
    return Order.findById(oid).populate({
        path: 'items',
        model: 'CartItem',
        populate: {
            path: 'product',
            model: 'Product'
        }
    })
}

// ReST API neccesary methods

Model.getUser = function (uid) {
    return User.findById(uid).populate({
        path: 'cart',
        model: 'Cart',
        populate: {
            path: 'items',
            model: 'CartItem',
            populate: {
                path: 'product',
                model: 'Product'
            }
        }
    })
        .populate({
            path: 'orders',
            model: 'Order',
            populate: {
                path: 'items',
                model: 'CartItem',
                populate: {
                    path: 'product',
                    model: 'Product'
                }
            }
        });
};

Model.addToCart = function (uid, pid) {
    let promises = [
        User.findById(uid).populate(
            {
                path: 'cart',
                model: 'Cart',
                populate: {
                    path: 'items',
                    model: 'CartItem',
                    populate: {
                        path: 'product',
                        model: 'Product'
                    }
                }
            }),
        Product.findById(pid)
    ];

    return Promise.all(promises)
        .then(([user, product]) => {
            for (let item of user.cart.items) {
                if (item.product.equals(product)) {
                    item.qty += 1
                    return item.save()
                        .then(() => {
                            user.cart.subtotal += product.price;
                            user.cart.total = user.cart.subtotal * user.cart.tax;
                            return user.cart.save();
                        });
                }
            }
            return new Item(
                {
                    product: product,
                    qty: 1,
                    total: product.price,
                    subtotal: product.price
                }).save()
                .then(item => {
                    user.cart.items.push(item);
                    user.cart.subtotal += item.total;
                    user.cart.total = user.cart.subtotal * user.cart.tax;
                    return user.cart.save();
                })

        })
    // })
};

Model.removeOneProduct = function (uid, pid) {
    var promises = [User.findById(uid), Product.findById(pid)]
    return Promise.all(promises)
        .then(([user, product]) => {
            return Cart.findById(user.cart).populate({
                path: 'items',
                model: 'CartItem',
                populate: {
                    path: 'product',
                    model: 'Product'
                }
            })
                .then(cart => {
                    for (let item of cart.items) {
                        if (item.product.equals(product)) {
                            if (item.qty == 1)
                                return Item.deleteOne(item)
                                    .then(() => {
                                        cart.subtotal -= item.total;
                                        cart.total = cart.subtotal * cart.tax;
                                        cart.items.pull(item);
                                        return cart.save();
                                    });
                            else {
                                item.qty -= 1;
                                return item.save()
                                    .then(() => {
                                        cart.subtotal -= item.total;
                                        cart.total = cart.subtotal * cart.tax;
                                        return cart.save()
                                    });
                            }
                        }
                    }
                });
        })
};

Model.removeAllProduct = function (uid, pid) {
    var promises = [
        User.findById(uid).populate({
            path: 'cart',
            model: 'Cart',
            populate: {
                path: 'items',
                model: 'CartItem',
                populate: {
                    path: 'product',
                    model: 'Product'
                }
            }
        }),
        Product.findById(pid)
    ];

    return Promise.all(promises)
        .then(([user, product]) => {
            for (let item of user.cart.items) {
                if (item.product.equals(product)) {
                    return Item.deleteOne(item)
                        .then(() => {
                            user.cart.items.pull(item);
                            user.cart.subtotal -= (item.total * item.qty);
                            user.cart.total = user.cart.subtotal * user.cart.tax;
                            return user.cart.save();
                        })
                }
            }
        })
};

module.exports = Model;