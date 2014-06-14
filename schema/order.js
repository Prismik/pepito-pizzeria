var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    orderid: { type: Number }
}, { collection: 'orders' });

var model = mongoose.model('orders', schema)
module.exports = {
    Order: model
}