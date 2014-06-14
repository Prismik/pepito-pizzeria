var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id: { type: Number }
    , name: { type: String }
    , adress: { type: String }
    , postal_code: { type: String }
    , description: { type: String }
    , restaurateur: { type: String }
}, { collection: 'restaurants' })

var model = mongoose.model('restaurants', schema)
module.exports = {
    Restaurant: model
}