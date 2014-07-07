var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: { type: String }
    , plates: [mongoose.Schema.Types.ObjectId]
}, { collection: 'menus' });

var model = mongoose.model('menus', schema)
module.exports = {
    Menu: model
}