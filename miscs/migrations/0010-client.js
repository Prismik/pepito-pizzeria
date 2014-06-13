var mongodb = require('mongodb');

exports.up = function(db, next){
	var type_docs = [{
		name: 'client',
		rights: [
			
		]
	}];

    var plates = mongodb.Collection(db, 'plates');
    plates.insert(plate_docs, next);
};

exports.down = function(db, next){
    var plates = mongodb.Collection(db, 'plates');
    plates.remove();

    var menus = mongodb.Collection(db, 'menus');
    menus.remove();

    var restaurants = mongodb.Collection(db, 'restaurants');
    restaurants.remove();
};
