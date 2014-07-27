var mongodb = require('mongodb');
var crypto = require('crypto');
var ObjectID = require('mongodb').ObjectID;

var nothing = function nothing(err, doc12) {

}

exports.up = function(db, next) {
    var doc01 = new ObjectID();
    var doc02 = new ObjectID();
    var doc0 = new ObjectID();
    var doc1 = new ObjectID();
    var doc2 = new ObjectID();
    var doc3 = new ObjectID();
    var doc4 = new ObjectID();
    
    var doc5 = new ObjectID();
    var doc6 = new ObjectID();
    var doc7 = new ObjectID();
    var doc8 = new ObjectID();
    var doc9 = new ObjectID();

    var doc10 = new ObjectID();
    var doc11 = new ObjectID();
    var doc12 = new ObjectID();
    var doc13 = new ObjectID();
    var doc14 = new ObjectID();
    var doc15 = new ObjectID();
    var doc16 = new ObjectID();

    var restaurant_docs = [{
        _id: doc11,
        name: "Pepito Pizzeria",
        address: "378 Jackson street",
        postal_code: "J2Z 1B6",
        description: "Epic pizza restaurant",
        menus: [
            doc10,
            doc12
        ]
    }];

    var menu_docs = [{
        _id: doc10,
        name: "Pepito menu",
        plates: [
            doc13,
            doc14
        ]
    },{
        _id: doc12,
        name: "Pepito special menu",
        plates: [
            doc15,
            doc16
        ]
    }];

    var plate_docs  = [{
            _id: doc13,
            name: "All dressed",
            price: 17.28,
            description: "12 inches all dressed pizza"
        },{
            _id: doc14,
            name: "Epic load of meat",
            price: 21.12,
            description: "A pizza with a shit load of meat on it"
        },{
            _id: doc15,
            name: "Vegepizza",
            price: 25.23,
            description: "A veggie pizza"
        },{
            _id: doc16,
            name: "Cheesie doodeli cheese",
            price: 21.12,
            description: "A pizza with cheese and cheese on top of more cheese"
        }
    ];

    var plates = mongodb.Collection(db, 'plates');
    plates.insert(plate_docs, nothing);
    var menus = mongodb.Collection(db, 'menus');
    menus.insert(menu_docs, nothing);
    var restaurants = mongodb.Collection(db, 'restaurants');
    restaurants.insert(restaurant_docs, nothing);

    var permission_docs = [
        { _id: doc01, name: 'prepareCommand' }, 
        { _id: doc0, name: 'manageMenu' }, 
        { _id: doc1, name: 'manageUser' }, 
        { _id: doc2, name: 'manageRestaurant' }, 
        { _id: doc02, name: 'manageRestaurateur' },
        { _id: doc3, name: 'passOrder'},
        { _id: doc4, name: 'handleDelivery'}
    ];

    var accountType_docs = [{
        _id: doc5,
        name: 'client',
        rights: [doc3]
    }, {
        _id: doc6,
        name: 'restaurateur',
        rights: [doc01, doc0]
    }, {
        _id: doc7,
        name: 'admin',
        rights: [doc01, doc0, doc1, doc2, doc02, doc3, doc4]
    }, {
        _id: doc8,
        name: 'deliveryMan',
        rights: [doc4]
    }, {
        _id: doc9,
        name: 'entrepreneur',
        rights: [doc2, doc02]
    }];

    var permissions = mongodb.Collection(db, 'permissions');
    permissions.insert(permission_docs, nothing);
    var accountType = mongodb.Collection(db, 'accountTypes');
    accountType.insert(accountType_docs, nothing);

    var userDocs = [{
        username: 'Johny Cash',
        accountType: doc8,
        birthdate: '1980/12/12',
        address: [
            { address: '12 rue Du Miasme', postalCode:'H2X 3EB' },
            { address: '21 rue Du Miasme', postalCode:'H4Z 8JG' }
        ],
        phone: '450-556-0554',
        email: 'deliveryGuy@email.com',
        password: crypto.createHash('md5').update('deliveryGuy').digest('hex')
    }, {
        username: 'Renard Thénardier',
        accountType: doc7,
        birthdate: '1980/12/12',
        address: [
            { address: '12 rue Dulac', postalCode:'J2A 3RB' },
            { address: '21 rue Dulac', postalCode:'J4C 8JK' }
        ],
        phone: '450-626-0924',
        email: 'admin@email.com',
        password: crypto.createHash('md5').update('admin').digest('hex')
    }, {
        username: 'Romuald Rémillard',
        accountType: doc5,
        birthdate: '1982/07/06',
        address: [
            { address: '12 rue Pontmercy', postalCode:'J3H 1IP' },
            { address: '21 rue Pontmercy', postalCode:'J0Q 5VX' }
        ],
        phone: '450-346-2837',
        email: 'user@email.com',
        password: crypto.createHash('md5').update('user').digest('hex')
    }, {
        username: 'Samson Sonsam',
        accountType: doc6,
        birthdate: '1972/01/10',
        address: [
            { address: '12 rue Waterloo', postalCode:'K3Q 1HF' },
            { address: '21 rue Waterloo', postalCode:'K0H 5BN' }
        ],
        phone: '450-171-4983',
        email: 'restaurateur@email.com',
        password: crypto.createHash('md5').update('restaurateur').digest('hex'),
        restaurant: doc11
    }, {
        username: 'Tommy Connard',
        accountType: doc9,
        birthdate: '1971/11/08',
        address: [
            { address: '12 rue Connard', postalCode:'K3Q 1HF' },
            { address: '21 rue Connard', postalCode:'K0H 5BN' }
        ],
        phone: '450-222-4983',
        email: 'entrepreneur@email.com',
        password: crypto.createHash('md5').update('entrepreneur').digest('hex')
    }]

    var users = mongodb.Collection(db, 'usercollection');
    users.insert(userDocs, next);
};

exports.down = function(db, next) {
    var users = mongodb.Collection(db, 'usercollection');
    users.remove(function(err, removedCount) {});

    var permissions = mongodb.Collection(db, 'permissions');
    permissions.remove(function(err, removedCount) {});

    var accountTypes = mongodb.Collection(db, 'accountTypes');
    accountTypes.remove(function(err, removedCount) {});


    var plates = mongodb.Collection(db, 'plates');
    plates.remove(function(err, removedCount) {});

    var menus = mongodb.Collection(db, 'menus');
    menus.remove(function(err, removedCount) {});

    var restaurants = mongodb.Collection(db, 'restaurants');
    restaurants.remove(function(err, removedCount) {});

    next();
};
