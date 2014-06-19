var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
var mongoose = require('mongoose');

plateSchema = new mongoose.Schema({
            plateid: { type: Number }
           , name: { type: String }
           , price: { type: String }
           , description: { type: String }
}, { collection: 'platecollection' })

plateModel = mongoose.model('platecollection', plateSchema)

module.exports = {

    getPlateModel: function () {

        if (mongoose.connection.readyState == 0) {
            mongoose.connect(config.db);
        }

        return plateModel;

    }
}