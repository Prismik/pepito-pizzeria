var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

exports.up = function(db, next) {
    var doc1 = new ObjectID();
    var doc2 = new ObjectID();
    var doc3 = new ObjectID();
    var permission_docs = [{
        _id: doc1,
        name: 'manageUser'
    }, {
        _id: doc2,
        name: 'manageRestaurant'
    }, {
        _id: doc3,
        name: 'passOrder'
    }];

	var accountType_docs = [{
		name: 'client',
		rights: [doc3]
	}, {
        name: 'restaurateur',
        rights: [doc2]
    }, {
        name: 'admin',
        rights: [doc1, doc2, doc3]
    }];

    var permissions = mongodb.Collection(db, 'permissions');
    permissions.insert(permission_docs, next);

    var accountType = mongodb.Collection(db, 'accountTypes');
    accountType.insert(accountType_docs, next);
};

exports.down = function(db, next) {
    var permissions = mongodb.Collection(db, 'permissions');
    permissions.remove(function(err, removedCount) {});

    var accountTypes = mongodb.Collection(db, 'accountTypes');
    accountTypes.remove(function(err, removedCount) {});

    next();
};
