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

    var newMenu = new Menu({
        name: req.body.name
    });

    newMenu.save(function (err, newMenu) {
        if (err) {
           res.send({status:"500", message:"The menu could not be inserted"});
        }
        else {
            var plates = JSON.parse(req.body.plates);

            for (i = 0; i < plates.length; i++) { 
                var item = plates[i];

                console.log(item);

                var plate = new Plate({
                    name: item.name,
                    price: parseFloat(item.price),
                    description: item.description
                });

                Menu.update({_id: newMenu._id },
                    {$push: { 'plates' : plate._id }},
                    {upsert:true}, function(err, data) { 
                        plate.save();
                });
                
            }


            res.send({status:"200", message:"The menu was inserted"});
        }
    });
});

module.exports = router;
