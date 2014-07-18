var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');
var helper = require('../lib/helper');

var AccountType = require('../schema/accountType').AccountType;

var schema = new mongoose.Schema({
    name: { type: String }
    , adress: { type: String }
    , postal_code: { type: String }
    , description: { type: String }
    , menus: [mongoose.Schema.Types.ObjectId]
}, { collection: 'restaurants' })

schema.methods.getFreeRestaurants = function(callback) {
    //Va chercher le id des restaurateurs
    AccountType.findOne({name: "restaurateur"}, function(err, r) {
        //Va chercher les restaurateur avec le id
        mongoose.model('usercollection').find({ accountType: r._id }, function(err, restaurateurs) {
            mongoose.model('restaurants').find({ }, function(err, tous) { 
                for (var i = restaurateurs.length - 1; i >= 0; i--) { 
                    var res= helper.getObjectFromId(tous, restaurateurs[i].restaurant)
                    if (res != null)
                        tous.splice(tous.indexOf(res),1);
                }
                callback(null, tous);
            });
    	});
    });
};

var model = mongoose.model('restaurants', schema)
module.exports = {
    Restaurant: model
}

