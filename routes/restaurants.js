var express = require('express');
var router = express.Router();
var Restaurant = require('../schema/restaurant').Restaurant;

router.get('/', function(req, res) {
    var db = req.db;
    Restaurant.find().exec(function(e,docs){
        res.render('restaurants/list', {
            title: 'Pepito Pizzeria - Restaurants',
            header: 'Restaurants',
            active: 'resto',
            restos: docs
        });
    });
});

router.get('/create', function(req, res){
    res.render('restaurants/create', {
        title: 'Pepito Pizzeria - Restaurants',
        header: 'Restaurants',
        active: 'resto'
    });
});

router.post('/add', function (req, res) {
    var newRestaurant = new Restaurant({
        name: req.body.name
        , adress: req.body.address
        , postal_code: req.body.postal_code
        , description: req.body.description
        , restaurateur: req.body.restaurateur
    })
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
    Restaurant.findOne({ _id: req.body.restaurantId }).exec(function (err, docs) {
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
            restos: docs
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
		 	description: req.body.description,
		 	restaurateur: req.body.restaurateur
        },
        function (err, doc) {
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
