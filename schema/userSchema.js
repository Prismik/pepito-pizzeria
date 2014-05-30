var mongoose = require('mongoose');

module.export = function (db) {

    mongoose.connect('localhost: 27017 / pepito - pizzeria') //change for the dev or prod

    var Schema = mongoose.Schema;

    var User = new Schema({
        id: { type: Number}
      , username: { type: String }
      , date: { type: Date }
      , address: { type: String }
      , phone: { type: String }
      , email: {type: String }
    });

    return User;

}

