var mongoose = require('mongoose');
var Item = require('./item')
var Schema = mongoose.Schema;

var schema = Schema({
    items: [{ type: Schema.Types.ObjectId, ref: 'Items' }],
    date: { type: Date, required: true },
    address: { type: String, required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    tax: { type: Number, required: true },
    cardHolder: { type: String, required: true },
    cardNumber: { type: Number, required: true }
});

module.exports = mongoose.model('Order', schema);