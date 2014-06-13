var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');

userSchema = new mongoose.Schema({
    userid: { type: Number }
           , nom: { type: String }
           , adress: { type: String }
           , postalcode: { type: String }
           , description: { type: String }
}, { collection: 'restorantcollection' })

userModel = mongoose.model('restorantcollection', userSchema)

module.exports = {

    getUserModel: function () {

        if (mongoose.connection.readyState == 0) {
            mongoose.connect(config.db);
        }

        return userModel;

    }
}