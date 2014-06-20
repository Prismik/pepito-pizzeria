var express = require('express');
var router = express.Router();
var Permission = require('../schema/permission').Permission;
var AccountType = require('../schema/accountType').AccountType;

router.get('/', function(req, res) {
    var db = req.db;
    AccountType.find().exec(function(e,docs){
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
    //connect the schema
    var restaurant = restaurantchema.getRestaurantModel(req.db);

    var newRestaurant = new restaurant({
        name: req.body.name
        , address: req.body.address
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

router.post('/update', function(req, res){
    var db = req.db;
    var collection = restaurantchema.getRestaurantModel(req.db);
    collection.findOne({ _id: req.body.restaurantId }).exec(function (err, docs){
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

module.exports = router;
