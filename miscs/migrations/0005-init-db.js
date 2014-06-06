
var mongodb = require('mongodb');

exports.up = function(db, next){
	var restaurant_docs = [{
		name: "Pepito Pizzeria",
		adress: "378 Jackson street",
		postal_code: "J2Z 1B6",
		description: "Epic pizza restaurant",
		menus: [
			123,
			456
		]
	}];

	var menu_docs = [{
		_id: 123,
		name: "Pepito menu",
		plates: [
			123,
			456
		]
	},{
		_id: 456,
		name: "Pepito special menu",
		plates: [
			789,
			101112
		]
	}];

	var plate_docs  = [{
			_id: 123,
			name: "All dressed",
			price: 17.28,
			description: "12 inches all dressed pizza"
		},{
			_id: 456,
			name: "Epic load of meat",
			price: 21.12,
			description: "A pizza with a shit load of meat on it"
		},{
			_id: 789,
			name: "Vegepizza",
			price: 25.23,
			description: "A veggie pizza"
		},{
			_id: 101112,
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

exports.down = function(db, next){
    var plates = mongodb.Collection(db, 'plates');
    plates.remove();

    var menus = mongodb.Collection(db, 'menus');
    menus.remove();

    var restaurants = mongodb.Collection(db, 'restaurants');
    restaurants.remove();
};
