var express = require('express');
var constants = require('../lib/constants');
var router = express.Router();

var Order = require('../schema/order').Order;
var Restaurant = require('../schema/restaurant').Restaurant;
var Menu = require('../schema/menu').Menu;
var Plate = require('../schema/plate').Plate;
var User = require('../schema/user').User;

router.get('/', function(req, res) {
    
});

router.get('/create', function(req, res){
    res.render('menus/create', {});
});

router.post('/addMenu', function(req, res){
    console.log(req.body);

    var newRestaurant = new Restaurant({
        name: req.body.name
    })
    newRestaurant.save(function (err, newRestaurant) {
        if (err) {
            res.send({status:"500", message:"The menu could not be inserted"});
        }
        else {
            res.send({status:"200", message:"The menu was added succesfully"});
        }
    });
});

module.exports = router;
