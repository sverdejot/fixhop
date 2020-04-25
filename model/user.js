var mongoose = require('mongoose');
var Order = require('./order');
var Cart = require('./cart');
var Schema = mongoose.Schema;

var schema = Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    birth: { type: Date, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' }
});

module.exports = mongoose.model('User', schema);