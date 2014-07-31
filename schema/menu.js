var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: { type: String }
    , plates: [mongoose.Schema.Types.ObjectId]
}, { collection: 'menus' });

var model = mongoose.model('menus', schema)

schema.methods.addPlates = function(params, id) {
    for (var i = 0; i != params.length; ++i) {
    	var item = params[i];
    	var newPlate = new Plate({
	        name: item.name,
	        price: item.price,
	        description: item.description
	    });

	    newPlate.save(function (err, newPlate) {
	        if (err)
	            console.log("Plate not added");
	        else
	            platesId.push(newPlate._id);
	    });
    }
};

module.exports = {
    Menu: model
}