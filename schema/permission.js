var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	id: { type: Number },
    name: { type: String }
}, { collection: 'permissions' });

var model = mongoose.model('permissions', schema)
module.exports = {
    Permission: model
}