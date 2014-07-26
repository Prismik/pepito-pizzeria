var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId }
    , deliverManId: { type: mongoose.Schema.Types.ObjectId }
    , deliveryDate: { type: String }
}, { collection: 'deliveryDiary' })

var model = mongoose.model('deliveryDiary', schema)
module.exports = {
    DeliveryDiary: model
}