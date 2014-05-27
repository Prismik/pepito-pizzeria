var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    
});

router.get('/create', function(req, res){
    var db = req.db;
    var restaurantCollection = db.get('restaurants');
    
    restaurantCollection.find({},{},function(e,docs){
        if(docs){
            res.render('orders/create', {
                restaurantList: docs
            });
        }else{
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

    //TODO: retreive right element from ID

    res.send({
        "_id" : "def",
        "name" : "Epic load of meat",
        "price" : 21.12,
        "description" : "A pizza with a shit load of meat on it"
    });
});

router.post('/confirmOrder', function(req,res){

});

module.exports = router;