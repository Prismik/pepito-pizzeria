var mongoose = require('mongoose');

module.export = {

    getUserSchema: function (db) {

        mongoose.connect(db) 

        var Schema = mongoose.Schema;

        var userschem = new Schema({
            id: { type: Number }
          , username: { type: String }
            //    , date: { type: Date }
            //    , address: { type: String }
            //    , phone: { type: String }
          , email: { type: String }
          , password: { type: String }
        });

        return userschem;

    }
}