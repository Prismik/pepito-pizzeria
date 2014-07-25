var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
   address: { 
            address: String,
            postalCode: String
        },
   restaurantId: { type: mongoose.Schema.Types.ObjectId },
   date: { type: String },
   order: [mongoose.Schema.Types.Mixed],
   status: { type: Number }
}, { collection: 'orders' });

var model = mongoose.model('orders', schema)
module.exports = {
    Order: model
}