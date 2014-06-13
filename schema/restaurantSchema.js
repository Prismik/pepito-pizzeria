var mongoose = require('mongoose');

module.exports = {


    getRestaurantModel: function (db) {

        var connectString = db.driver._connect_args[0];

        if (mongoose.connection.readyState == 0) 
        {
            mongoose.connect(connectString.substring(10, connectString.length));
        }

        var Schema = mongoose.Schema;

           var restaurantschema = new Schema({
                  name: { type: String }
                  , address: { type: String }
                  , postal_code: { type: String }
                  , description: { type: String }
                  , menus: { type: "number" }
                  , restaurateur: { type: String }
                }, { collection: 'restaurants' });

              try {
                return mongoose.model('restaurants', restaurantschema);
            } catch (e) {
                return mongoose.model('restaurants')
            }

        

    },

    closeConnection: function () {

        mongoose.disconnect();
    }
}