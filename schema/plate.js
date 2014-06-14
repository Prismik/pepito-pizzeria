var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    plateid: { type: Number }
    , name: { type: String }
    , price: { type: String }
    , description: { type: String }
}, { collection: 'plates' })

var model = mongoose.model('plates', schema)
module.exports = {
    getUserModel: function () {
        if (mongoose.connection.readyState == 0)
            mongoose.connect(config.db);

        return model;
    }
}