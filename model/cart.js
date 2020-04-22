var mongoose = require('mongoose');
var Item = require('./item');
var Schema = mongoose.Schema;

var schema = Schema({
    items: [{ type: Schema.Types.ObjectId, ref: 'Items' }],
    subtotal: { type: Number, required: true, default: 0},
    total: { type: Number, required: true, default: 0},
    tax: { type: Number, required: true, default: 1.21}
});

module.exports = mongoose.model('Cart', schema);