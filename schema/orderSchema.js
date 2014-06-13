var mongoose = require('mongoose');

module.exports = {

    getOrderModel: function (db) {

        var connectString = db.driver._connect_args[0];

        if (mongoose.connection.readyState == 0) {
            mongoose.connect(connectString.substring(10, connectString.length));
        }

        var Schema = mongoose.Schema;

        var orderschem = new Schema({
                orderid: { type: Number }
                //ajouter autre propriété  
        }, { collection: 'orderrcollection' });


        try {
            return mongoose.model('ordercollection', userschem);
        } catch (e) {
            return mongoose.model('ordercollection')
        }

    }
}