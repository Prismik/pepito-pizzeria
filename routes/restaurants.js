var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('restaurants');
    collection.find({},{},function(e,docs){
        res.render('restaurants/list', {
            title: 'Pepito Pizzeria - Restaurants',
            header: 'Restaurants',
            active: 'resto'
        });
    });
});

router.get('/create', function(req, res){
    res.render('restaurants/create', {
        title: 'Pepito Pizzeria - Users',
        header: 'Restaurants',
        active: 'resto'
    });
});

router.get('/update', function(req, res){
    res.render('restaurants/update', {
        title: 'Pepito Pizzeria - Users',
        header: 'Restaurants',
        active: 'resto'
    });
});

module.exports = router;
