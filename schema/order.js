var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    orderid: { type: Number }
}, { collection: 'orders' });

var userModel = mongoose.model('orders', userSchema)
module.exports = {
    getOrderModel: function () {
        if (mongoose.connection.readyState == 0)
            mongoose.connect(config.db);
        
        return userModel;
    }
}