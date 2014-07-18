var express = require('express');
var router = express.Router();
var User = require('../schema/user').User;
var Restaurant = require('../schema/restaurant').Restaurant;
var helper = require('../lib/helper');

router.get('/', function(req, res) {
    User.find({ }, function (e, users) {
        Restaurant.find({ }, function (e,docs) {
            for (var i = 0; i < docs.length; ++i) {
                r="None";
                
                for (var j = 0; j < users.length; ++j) {
                    if(users[j].restaurant!=null){
                        console.log(users[j].restaurant.toString() + " ?= "+docs[i]._id+"\n\n\n");
                        if (users[j].restaurant.toString() == docs[i]._id) {
                            r = users[j].username;
                        }
                    }
                }

                docs[i].restaurateur = r;
            }
            
            res.render('restaurants/list', {
                title: 'Pepito Pizzeria - Restaurants',
                header: 'Restaurants',
                active: 'resto',
                restos: docs
            });
        });
    });
});

router.get('/create', function(req, res) {
    var user = new User();
    user.getFreeRestaurateurs(function (err, users) {
        res.render('restaurants/create', {
            title: 'Pepito Pizzeria - Restaurants',
            header: 'Restaurants',
            active: 'resto',
            users: users
        }, null);
    });
});

router.post('/add', function (req, res) {
    var newRestaurant = new Restaurant({
        name: req.body.name
        , adress: req.body.address
        , postal_code: req.body.postal_code
        , description: req.body.description
    });

    User.findOneAndUpdate(
    { _id: req.body.restaurateur },
    {
        restaurant : newRestaurant._id
    },
    function (err, doc) {
        newRestaurant.save(function (err, newRestaurant) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                res.location("/restaurants");
                res.redirect("/restaurants");
            }
        });    
    });
});

router.post('/delete', function (req, res) {
    var db = req.db;
    Restaurant.remove({ "_id": req.body.restaurantName }, function (err) {
        if (err) {
            res.send("There was a problem deleting restaurant.");
        }
        else {
            res.location("/restaurants");
            res.redirect("/restaurants");
        }
    });
});

router.post('/update', function(req, res){
    var user = new User();
    user.getRestaurateurs(function (err, users) {

        Restaurant.findOne({ _id: req.body.restaurantId }).exec(function (err, docs) {
            var currUser = "ND";

            for (var j = 0; j < users.length; ++j) {
                console.log(users[j].restaurant + "==" + docs._id);
                if(users[j].restaurant != null && users[j].restaurant.toString() == docs._id.toString()){
                    currUser = users[j]._id;
                }
            }
            res.render('restaurants/update', {
            	name : docs.name,
                address : docs.address,
                postal_code : docs.postal_code,
                description : docs.description,
                restaurateur : docs.restaurateur,
                id : docs._id,
                title: 'Pepito Pizzeria - Restaurants',
                header: 'Modify '+docs.name,
                active: 'resto',
                restos: docs,
                currUser: currUser,
                users: users
            });
        });
    });
});

router.post('/updateRestaurant', function(req, res){
    var restaurant = Restaurant.findOneAndUpdate(
        { _id: req.body.restaurantId },
        {
            name: req.body.name,
         	address: req.body.address,
		 	postal_code: req.body.postal_code,
		 	description: req.body.description
        },
        function (err, doc) {
            User.findOneAndUpdate(
                {restaurant : req.body.restaurantId},
                {$unset : {restaurant : ""}},
                function (err, pudoc){
                    User.findOneAndUpdate(
                        { _id: req.body.restaurateur },
                        {
                            restaurant : doc._id
                        },
                        function (err, udoc) {
                            if (err) {
                               // If it failed, return error
                               res.send("There was a problem updating the information in the database.");
                           }
                           else {
                               res.location("/restaurants");
                               res.redirect("/restaurants");
                           }
                    });
            });
    });
});

//Ajax request for validating if email address is used
router.post('/verifyAddress', function(req,res){
    var db = req.db;
    var validateAddress = req.body.validateAddress;
    Restaurant.findOne({address:validateAddress}).exec(function(e,docs){
        if(docs!=null){
	        res.send(false);
        }else{
	        res.send(true);
        }
    });
});

module.exports = router;
