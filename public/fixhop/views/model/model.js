var Model = {};

Model.user = "5ea4f557033e705e30517e35";

Model.getUser = function (uid) {
    return new Promise(function (resolve, reject) {
        if (uid != null)
            $.ajax({
                url: '/fixhop/api/users/' + uid + '/profile',
                method: 'GET'
            })
                .done(user => resolve(user))
                .fail(err => reject(err));
        else
            resolve(null);
    });
};

Model.getProducts = function () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/fixhop/api/products',
            method: 'GET'
        })
        .done(products => resolve(products))
        .fail(err => reject(err));
    })
};

Model.getProduct = function (pid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/fixhop/api/products/' + pid,
            method: 'GET'
        })
        .done(product => resolve(product))
        .fail(err => reject(err));
    });
};

Model.getShoppingCart = function (uid) {
    return new Promise(function (resolve, reject) {
        if (uid != null)
            $.ajax({
                url: '/fixhop/api/users/' + uid + '/cart',
                method: 'GET'
            })
            .done(cart => resolve(cart))
            .fail(err => reject(err));
        else
            resolve({ items: [] });
    });
};

Model.cartItemCount = function (uid) {
    return new Promise(function (resolve, reject) {
        if (uid != null)
            $.ajax({
                url: '/fixhop/api/users/' + uid + '/cart/items',
                method: 'GET'
            })
            .done(items => {
                var cartItemCount = 0;
                for (let item of items)
                    cartItemCount += item.qty;
                resolve(cartItemCount);
            })
            .fail(err => reject(err));
        else
            resolve(0);
    });
};

Model.addToCart = function (uid, pid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/fixhop/api/users/' + uid + '/cart/items/' + pid,
            method: 'POST'
        })
        .done(cart => resolve(cart))
        .fail(err => reject(err));
    });
};

// MÉTODO PROVISIONAL
Model.signin = function (credentials) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/fixhop/api/users/signin',
            method: 'POST',
            data: credentials,
        })
        .done(user => {
            Model.user = user._id;
            resolve(Model.user);
        })
        .fail(err => reject(err));
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
        $.ajax({
            url: '/fixhop/api/users/signup',
            method: 'POST',
            data: new_user
        })
        .done(user => resolve(user))
        .fail(err => reject(err));
    });
};

Model.removeOneProduct = function (uid, pid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/fixhop/api/users/' + uid + '/cart/items/' + pid + '/decrease',
            method: 'DELETE'
        })
        .done(cart => resolve(cart))
        .fail(err => reject(err));
    });
};

Model.removeAllProduct = function (uid, pid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/fixhop/api/users/' + uid + '/cart/items/' + pid,
            method: 'DELETE'
        })
        .done(cart => resolve(cart))
        .fail(err => reject(err));
    });
};

Model.checkout = function (uid, order) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/fixhop/api/users/' + uid + '/orders',
            method: 'POST',
            data: order
        })
        .done(order => resolve(order._id))
        .fail(err => reject(err));
    });
};

Model.getOrder = function (uid, oid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/fixhop/api/users/' + uid + '/orders/' + oid,
            method: 'GET'
        })
        .done(order => resolve(order))
        .fail(err => reject(err));
    })
}