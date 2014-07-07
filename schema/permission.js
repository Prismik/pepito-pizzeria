var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: { type: String, index: {unique: true } }
}, { collection: 'permissions' });

var model = mongoose.model('permissions', schema)
module.exports = {
    Permission: model
}