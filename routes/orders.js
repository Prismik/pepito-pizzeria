var express = require('express');
var mail = require('../lib/mail');
var router = express.Router();

router.get('/', function(req, res) {
    
});

router.get('/create', function(req, res){
    var db = req.db;
    var restaurantCollection = db.get('restaurants');
    
    restaurantCollection.find({},{},function(e,docs){
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
    var db = req.db;
    var menuCollection = db.get('menus');
    var restaurantCollection = db.get('restaurants');

    restaurantCollection.findOne({_id:req.body.restaurantid},function(e,rdocs){
        menuCollection.find({_id:{$in:rdocs.menus}},function(e,mdocs){
            res.send(mdocs);
        });
    });
});

router.post('/updatePlates', function(req, res){
    var db = req.db;
    var plateCollection = db.get('plates');
    var menuCollection = db.get('menus');

    menuCollection.findOne({_id:parseInt(req.body.menuid)},function(e,mdocs){
        plateCollection.find({_id:{$in:mdocs.plates}},function(e,pdocs){
            res.send(pdocs);
        });
    });
});

router.post('/getPlate', function(req,res){
    var db = req.db;
    var plateCollection = db.get('plates');

    plateCollection.findOne({_id:parseInt(req.body.plateid)},function(e,docs){
        res.send(docs);
    });
});

router.post('/getUserAddresses', function(req,res){
    var db = req.db;
    var userCollection = db.get('usercollection');
    
    userCollection.findOne({_id:req.session.uid},function(e,docs){
        if(docs!=null){
            res.send(docs);
        }else{
            res.send('none');
        }
    });
});

router.post('/addAddressToCurrentUser', function(req,res){
    var db = req.db;
    var userCollection = db.get('usercollection');

    userCollection.update({_id:req.session.uid},{"$addToSet":{address:req.body.address}});
    
    userCollection.findOne({_id:req.session.uid},function(e,docs){
        if(docs!=null){
            userCollection.update({_id:req.session.uid},{"$set":{defaultAddress:docs.address.length-1}});
        }
    });
    res.send("200");
});

router.post('/confirmOrder', function(req,res){
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

router.post('/sendOrder', function(req,res){
    var db = req.db;
    var orders = db.get('orders');
    var userCollection = db.get('usercollection');


    var order = req.body.order;
    order.customer = req.session.uid;

    orders.insert(order);

    userCollection.findOne({_id:req.session.uid},function(e,docs){
        if(docs!=null){
            mail.sendMail("Your order has been confirmed", docs.email, "Order confirmation", "");
        }
    });

    res.send("202");
});

router.post('/changeDefaultAddress', function(req,res){
    var db = req.db;
    var userCollection = db.get('usercollection');


    userCollection.findOne({_id:req.session.uid},function(e,docs){
        if(docs!=null){
            userCollection.update({_id:req.session.uid},{"$set":{defaultAddress:req.body.address}});
        }
    });

    res.send("202");
});

module.exports = router;
