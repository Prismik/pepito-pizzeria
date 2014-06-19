var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');

restaurantSchema = new mongoose.Schema({
    restaurantid: { type: Number }
           , nom: { type: String }
           , adress: { type: String }
           , postalcode: { type: String }
           , description: { type: String }
}, { collection: 'restaurantcollection' })

restaurantModel = mongoose.model('restaurantcollection', restaurantSchema)

module.exports = {

    getRestaurantModel: function () {

        if (mongoose.connection.readyState == 0) {
            mongoose.connect(config.db);
        }

        return restaurantModel;

    }
}