var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    username: { type: String }
    , accountType: { type: mongoose.Schema.Types.ObjectId, ref: 'accountTypes' }
    , birthdate: { type: String }
    , address: [String]
    , defaultAddress: { type: Number }
    , phone: { type: String }
    , email: { type: String }
    , password: { type: String }
    }, { collection: 'usercollection' }
);

var model = mongoose.model('usercollection', schema)
module.exports = {
    User: model
}