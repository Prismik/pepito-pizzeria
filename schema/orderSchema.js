var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');

orderSchema = new mongoose.Schema({
    orderid: { type: Number }
}, { collection: 'ordercollection' })

orderModel = mongoose.model('ordercollection', orderSchema)

module.exports = {
    getOrderModel: function () {
        if (mongoose.connection.readyState == 0)
            mongoose.connect(config.db);

        return orderModel
    }
}