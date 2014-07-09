var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');

// test
var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

var AccountType = require('../schema/accountType').AccountType;
var Permission = require('../schema/permission').Permission;

var schema = new mongoose.Schema({
    username: { type: String }
    , accountType: { type: mongoose.Schema.Types.ObjectId }
    , birthdate: { type: String }
    , address: [ { 
            address: String,
            postalCode: String
        }]
    , defaultAddress: { type: Number }
    , phone: { type: String }
    , email: { type: String }
    , password: { type: String }
    , restaurant: { type : mongoose.Schema.Types.ObjectId, required : false}
    }, { collection: 'usercollection' }
);

schema.methods.getPermissions = function(params, callback) {
    mongoose.model('usercollection').findOne({_id: params}, function(err, self) {
        AccountType.findOne({_id: self.accountType}, function(err, type) { 
            Permission.find({_id: {$in: type.rights}}, callback);
        });
    });
};

schema.methods.getRestaurateurs = function(callback) {
    AccountType.findOne({name: "restaurateur"}, function(err, r) {
        mongoose.model('usercollection').find({ accountType: r._id ,  restaurant : { $exists : false } }, callback);
    });
};

var model = mongoose.model('usercollection', schema)
module.exports = {
    User: model
}