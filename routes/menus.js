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
        } else {
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

            User.findOne({_id:req.session.uid}).exec(function (err, docs) {
                console.log(docs);
                if(docs.restaurant!=null){
                     
                    Restaurant.findOneAndUpdate(
                        {_id:docs.restaurant},
                        {$push: { 'menus' : newMenu._id }},
                        {upsert:true}, function(err, data) {
                            res.send({status:"200", message:"The menu was inserted"});
                        } 
                    );

                }else{
                    res.send({status:"500", message:"The user does not have a restaurant"});
                    return 0;
                }
            });
        }
    });
});

module.exports = router;
