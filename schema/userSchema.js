var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');

userSchema = new mongoose.Schema({
           userid: { type: Number }
           , username: { type: String }
           , birthdate: { type: String }
           , address: [String]
           , defaultAddress: { type: Number }
           , postal: { type: String }
           , phone: { type: String }
           , email: { type: String }
           , password: { type: String }
       }, { collection: 'usercollection' })

userModel = mongoose.model('usercollection', userSchema)

module.exports = {
    getUserModel: function () {
        if (mongoose.connection.readyState == 0)
            mongoose.connect(config.db);

        return userModel
    }
}