var mongodb = require('mongodb');

exports.up = function(db, next){
    var permission_docs = [{
        _id: 99,
        name: 'manageUser'
    }, {
        _id: 98,
        name: 'manageRestaurant'
    }, {
        _id: 97,
        name: 'passOrder'
    }];

	var accountType_docs = [{
		name: 'client',
		rights: [97]
	}, {
        name: 'restaurateur',
        rights: [98]
    }, {
        name: 'admin',
        rights: [99, 98, 97]
    }];

    var permissions = mongodb.Collection(db, 'permissions');
    permissions.insert(permission_docs, next);

    var accountType = mongodb.Collection(db, 'accountTypes');
    accountType.insert(accountType_docs, next);
};

exports.down = function(db, next){
    var permissions = mongodb.Collection(db, 'permissions');
    permissions.remove();

    var accountTypes = mongodb.Collection(db, 'accountTypes');
    accountTypes.remove();
};
