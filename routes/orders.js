var express = require('express');
var mail = require('../lib/mail');
var router = express.Router();

var Order = require('../schema/order').Order;
var Menu = require('../schema/menu').Menu;
var Plate = require('../schema/plate').Plate;
var Restaurant = require('../schema/restaurant').Restaurant;
var User = require('../schema/user').User;

router.get('/', function(req, res) {
    
});

router.get('/create', function(req, res){
    Restaurant.find({},{},function(e,docs){
        if(docs){
            res.render('orders/create', {
                restaurantList: docs,
                active: 'createorder'
            });
        } else {
            res.render('orders/create', {
                error: 'Could not find any restaurants'
            });
        } 
    });
});

router.post('/updateMenus', function(req, res){
    Restaurant.findOne({_id:req.body.restaurantid},function(e,rdocs){
        Menu.find({_id:{$in:rdocs.menus}},function(e,mdocs){
            res.send(mdocs);
        });
    });
});

router.post('/updatePlates', function(req, res){
    Menu.findOne({_id:parseInt(req.body.menuid)},function(e,mdocs){
        Plate.find({_id:{$in:mdocs.plates}},function(e,pdocs){
            res.send(pdocs);
        });
    });
});

router.post('/getPlate', function(req,res) {
    Plate.findOne({_id:parseInt(req.body.plateid)},function(e,docs) {
        res.send(docs);
    });
});

router.post('/getUserAddresses', function(req,res) {
    User.findOne({_id:req.session.uid},function(e,docs) {
        if (docs != null)
            res.send(docs);
        else
            res.send('none');
    });
});

router.post('/addAddressToCurrentUser', function(req,res) {
    User.update(
        { _id:req.session.uid },
        { "$addToSet": { address:req.body.address } }
    );

    User.findOne({_id:req.session.uid},function(e,docs) {
        if (docs != null) {
            User.update({_id:req.session.uid},{"$set":{defaultAddress:docs.address.length-1}});
        }
    });

    res.send("200");
});

router.post('/confirmOrder', function(req,res) {
    var orders = JSON.parse(req.body.arrayOrder);

    var subtotal = 0;
    var orderElements = [];

    orders.forEach(function(entry) {
        console.log(entry);
        subtotal+=entry.quantity*entry.plate.price;
    });

    res.render('orders/confirmation', {
        orderList: orders,
        subtotal: subtotal,
        total: subtotal*2,
        active: 'createorder'
    });
});

router.post('/sendOrder', function(req,res) {
    var order = req.body.order;
    order.customer = req.session.uid;

    Order.insert(order);

    User.findOne({_id:req.session.uid},function(e,docs) {
        if(docs != null) {
            mail.sendMail("Your order has been confirmed", docs.email, "Order confirmation", "");
        }
    });

    res.send("202");
});

router.post('/changeDefaultAddress', function(req,res) {
    User.findOne({_id:req.session.uid},function(e,docs) {
        if(docs != null)
            User.update({_id:req.session.uid},{"$set":{defaultAddress:req.body.address}});
    });

    res.send("202");
});

module.exports = router;
