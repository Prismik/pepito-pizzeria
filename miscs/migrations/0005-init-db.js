var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

exports.up = function(db, next){
	var doc1 = new ObjectID();
    var doc2 = new ObjectID();
    var doc3 = new ObjectID();
    var doc4 = new ObjectID();
    var doc5 = new ObjectID();
    var doc6 = new ObjectID();
	var restaurant_docs = [{
		name: "Pepito Pizzeria",
		adress: "378 Jackson street",
		postal_code: "J2Z 1B6",
		description: "Epic pizza restaurant",
		menus: [
			doc1,
			doc2
		]
	}];

	var menu_docs = [{
		_id: doc1,
		name: "Pepito menu",
		plates: [
			doc3,
			doc4
		]
	},{
		_id: doc2,
		name: "Pepito special menu",
		plates: [
			doc5,
			doc6
		]
	}];


	var plate_docs  = [{
			_id: doc3,
			name: "All dressed",
			price: 17.28,
			description: "12 inches all dressed pizza"
		},{
			_id: doc4,
			name: "Epic load of meat",
			price: 21.12,
			description: "A pizza with a shit load of meat on it"
		},{
			_id: doc5,
			name: "Vegepizza",
			price: 25.23,
			description: "A veggie pizza"
		},{
			_id: doc6,
			name: "Cheesie doodeli cheese",
			price: 21.12,
			description: "A pizza with cheese and cheese on top of more cheese"
		}
	];

    var plates = mongodb.Collection(db, 'plates');
    plates.insert(plate_docs, next);

    var menus = mongodb.Collection(db, 'menus');
    menus.insert(menu_docs, next);

    var restaurants = mongodb.Collection(db, 'restaurants');
    restaurants.insert(restaurant_docs, next);
};

exports.down = function(db, next) {
    var plates = mongodb.Collection(db, 'plates');
    plates.remove(function(err, removedCount) {});

    var menus = mongodb.Collection(db, 'menus');
    menus.remove(function(err, removedCount) {});

    var restaurants = mongodb.Collection(db, 'restaurants');
    restaurants.remove(function(err, removedCount) {});

    next();
};
