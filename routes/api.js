var express = require('express');
var model = require('../model/model.js');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('API base');
});

// GET: products

router.get('/products', function(req, res, next) {
    model.getProducts()
        .then(products => res.json(products))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
});

// GET: products by pid

router.get('/products/:id', function (req, res, next) {
    model.getProduct(req.params.id)
        .then(product => res.json(product))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
});

// GET: shopping cart

router.get('/users/:uid/cart', function (req, res, next) {
    model.getUser(req.params.uid)
        .then(user => res.json(user.shopping_cart))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

// GET: shopping cart items

router.get('/users/:uid/cart/items', function (req, res, next) {
    model.getUser(req.params.uid)
        .then(user => res.json(user.shopping_cart.items))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

// POST: add product to cart

router.post('/users/:uid/cart/items/:pid', function (req, res, next) {
    model.getProduct(req.params.pid)
        .then(product => {
            model.addToCart(req.params.uid, product)
                .then(result => res.json(result))
                .catch(err => {
                    console.error(err);
                    res.status(500).json(err);
                })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

// DELETE: remove product from cart

router.delete('/users/:uid/cart/items/:pid', function (req, res, next) {
    model.getProduct(req.params.pid)
        .then(product => {
            model.removeAllProduct(req.params.uid, product)
                .then(result => res.json(result))
                .catch(err => {
                    console.error(err);
                    res.status(500).json(err);
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

// DELETE: decrease product qty by one

router.delete('/users/:uid/cart/items/:pid/decrease', function (req, res, next) {
    model.getProduct(req.params.pid)
        .then(product => {
            model.removeOneProduct(req.params.uid, product)
                .then(result => res.json(result))
                .catch(err => {
                    console.error(err);
                    res.status(500).json(err);
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

// POST: sign in

router.post('/users/signin', function (req, res, next) {
    model.signin(req.body)
        .then(result => res.json(result))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

// POST: sign up

router.post('/users/signup', function (req, res, next) {
    model.signup(req.body)
        .then(result => res.json(result))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

// GET: user profile

router.get('/users/:uid/profile', function (req, res, next) {
    model.getUser(req.params.uid)
        .then(user => res.json(user))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

// GET: user orders

router.get('/users/:uid/orders', function(req, res, next) {
    model.getUser(req.params.uid)
        .then(user => res.json(user.orders))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

// POST: order

router.post('/users/:uid/orders', function(req, res, next) {
    model.checkout(req.body)
        .then(order => res.json(order))
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

router.get('/users/:uid/orders/:number', function(req, res, next) {
    model.getUser(req.params.uid)
        .then(user => {
            for (let order of user.orders) if(order.id == req.params.number) res.json(order); 
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

router.get('/users/:uid/orders/:number/items', function(req, res, next) {
    model.getUser(req.params.uid)
        .then(user => {
            for (let order of user.orders) if(order.id == req.params.number) res.json(order.items); 
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

module.exports = router;