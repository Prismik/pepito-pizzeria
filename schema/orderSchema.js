var mongoose = require('mongoose');

module.exports = {

    getOrderModel: function (db) {

        mongoose.connect('localhost:27017/pepito-pizzeria');

        console.log(db.driver._connect_args);

        var Schema = mongoose.Schema;

        var orderschem = new Schema();

        return mongoose.model('ordercollection', orderschem);

    }
}