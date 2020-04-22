var mongoose = require('mongoose');
var Product = require('./product');

var Schema = mongoose.Schema;

var schema = Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    qty: { type: Number, required: true },
    total: { type: Number, required: true},
    subtotal: { type: Number, required: true}
});

module.exports = mongoose.model('CartItem', schema);