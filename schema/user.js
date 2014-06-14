var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    userid: { type: Number }
    , username: { type: String }
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
    getUserModel: function () {
        if (mongoose.connection.readyState == 0)
            mongoose.connect(config.db);

        return model;
    }
}