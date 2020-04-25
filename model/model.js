var Model = {};

var Product = require('./product');
var Item = require('./item');
var Cart = require('./cart');
var Order = require('./order');
var User = require('./user')

Model.users = [
    {
        id: 0,
        name: 'Samuel',
        surname: 'Verdejo de Toro',
        email: 'samuel.verdejo@alu.uclm.es',
        birth: '04/03/1998',
        address: 'Paseo de la Ilustración, 1, 2ºC',
        password: '1234',
        orders: [],
        shopping_cart: {
            total: 0,
            subtotal: 0,
            tax: 1.21,
            items: []
        }
    }
]

Model.user = null;

Model.getProducts = function () {
    return Product.find();
};

Model.getProduct = function (product_id) {
    return Product.findById(product_id);
};

Model.getShoppingCart = function (user_id) {
    return User.findById(user_id)
        .then(user => {
            return Cart.findById(user.cart).populate({
                path: 'items',
                populate: {
                    path: 'product'
                }
            })
        });
};

Model.cartItemCount = function () {
    return new Promise(function (resolve, reject) {
        Model.getShoppingCart()
            .then(function (cart) {
                var cartItemCount = 0;
                for (let item of cart.items) {
                    cartItemCount += item.qty;
                };

                resolve(cartItemCount);
            });
    });
};
/*
Model.addToCart = function (product_id) {
    return new Promise(function (resolve, reject) {
        var promises = [Model.getProduct(product_id), Model.getShoppingCart()];

        Promise.all(promises)
            .then(function (result) {
                var product = result[0];
                var shopping_cart = result[1];

                for (let item of shopping_cart.items) {
                    if (item.product.id == product.id) {
                        ++item.qty;
                        item.total += product.price;
                        var already_added = true;
                        break;
                    }
                };

                if (!already_added) {
                    shopping_cart.items.push({
                        product: product,
                        qty: 1,
                        total: product.price,
                        subtotal: product.price
                    })
                };

                shopping_cart.subtotal += product.price;
                shopping_cart.total = shopping_cart.subtotal * shopping_cart.tax;

                resolve(shopping_cart);
            })
    });
};*/

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
    return new Promise(function (resolve, reject) {
        User.findOne({ email: new_user.email })
            .then(user => {
                if (user != null) {
                    return reject('Ya hay un usuario registrado con esta dirección de correo electrónico.')
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
                            .then(user => {
                                return resolve(user)
                            })
                            .catch(err => {
                                return reject(err)
                            });
                    })
                        .catch(err => {
                            return reject(err);
                        })
                }
            })
    });
};

Model.removeOneProduct = function (product_id) {
    return new Promise(function (resolve, reject) {
        Model.getShoppingCart()
            .then(function (cart) {
                for (let item of cart.items) {
                    if (item.product.id == product_id) {
                        if (item.qty == 1) {
                            cart.items = cart.items.filter(_item => { return _item.product.id != product_id });
                        } else {
                            item.qty -= 1;
                            item.total -= product.price;
                        }
                        cart.subtotal -= item.product.price;
                        cart.total = cart.subtotal * cart.tax;
                        resolve('Producto eliminado satisfactoriamente')
                    }
                }
                reject('Producto no encontrado')
            })
    });
};

Model.removeAllProduct = function (product_id) {
    return new Promise(function (resolve, reject) {
        Model.getShoppingCart()
            .then(function (cart) {
                for (let item of cart.items) {
                    if (item.product.id == product_id) {
                        cart.subtotal -= (item.product.price * item.qty);
                        cart.total = cart.subtotal * cart.tax;
                        break;
                    }
                }
                cart.items = cart.items.filter(_item => { return _item.product.id != product_id });
                resolve('Producto eliminado satisfactoriamente')
            })
    });
};

Model.checkout = function (order) {
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

Model.getOrder = function (order_id) {
    return new Promise(function (resolve, reject) {
        Model.getLoggedUser()
            .then(function (user) {
                for (let order of user.orders) if (order.id == order_id) resolve(order);
            })
    })
}

// ReST API neccesary methods

Model.getUser = function (uid) {
    return User.findOne(uid);
};

Model.addToCart = function (uid, pid) {
    return new Promise(function (resolve, reject) {
        let promises = [User.findById(uid).populate('cart'), Product.findById(pid)];

        Promise.all(promises)
            .then(([user, product]) => {
                return Promise.all(user.cart.items.map(item => Item.findOne({ _id: item._id, product: product }).populate('product')))
                    .then(items => {
                        for (let item of items)
                            if (item != null) {
                                item.qty += 1;
                                return item.save()
                                    .then(item => {
                                        user.cart.subtotal += item.total;
                                        user.cart.total = user.cart.subtotal * user.cart.tax;
                                        return user.cart.save();
                                    });
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
            })
            .then(cart => resolve(cart))
            .catch(err => reject(err));
    });
};

Model.removeOneProduct = function (uid, product) {
    return new Promise(function (resolve, reject) {
        Model.getUser(uid)
            .then(function (user) {
                for (let item of user.shopping_cart.items) {
                    if (item.product.id == product.id) {
                        if (item.qty == 1) {
                            user.shopping_cart.items = user.shopping_cart.items.filter(_item => { return _item.product.id != product.id });
                        } else {
                            item.qty -= 1;
                            item.total -= product.price;
                        }
                        user.shopping_cart.subtotal -= item.product.price;
                        user.shopping_cart.total = user.shopping_cart.subtotal * user.shopping_cart.tax;
                        resolve(user);
                    }
                }
                reject('Producto no encontrado')
            })
    });
};

Model.removeAllProduct = function (uid, product) {
    return new Promise(function (resolve, reject) {
        Model.getUser(uid)
            .then(function (user) {
                for (let item of user.shopping_cart.items) {
                    if (item.product.id == product.id) {
                        user.shopping_cart.subtotal -= (item.product.price * item.qty);
                        user.shopping_cart.total = user.shopping_cart.subtotal * user.shopping_cart.tax;
                        break;
                    }
                }
                user.shopping_cart.items = user.shopping_cart.items.filter(_item => { return _item.product.id != product.id });
                resolve(user);
            });
    });
};

module.exports = Model;