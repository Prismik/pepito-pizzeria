var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('users/list', {
            title: 'Pepito Pizzeria - Users',
            header: 'Users',
            userlist: docs
        });
    });
});

/* GET New User page. */
router.get('/create', function(req, res) {
    res.render('users/create', { title: 'Pepito Pizzeria - Add New User' , header: 'Create user'});
});

/* GET Manage User page. */
router.get('/update', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.findOne({ _id: req.session.uid }, function(e,docs) {
        res.render('users/update', {
            username: docs.username,
            useremail: docs.email,
            userpassword: docs.password,
            userid: docs._id
        });
    });
});

/* POST to Add User Service */
router.post('/add', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.email;
    var userPassword = req.body.password;

    // Set our collection
    var collection = db.get('usercollection');
    // Submit to the DB
    collection.insert({
        "username": userName,
        "email": userEmail,
        "password": userPassword

    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("/login");
            // And forward to success page
            res.redirect("/login");
        }
    });
});

/* POST to Update User */
router.post('/updateuser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var userId = req.body.userid;
    var userPassword = req.body.password;


    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.update(
    {
        _id: userId
    },
    {
    "$set":
        {
            username: userName,
            email: userEmail,
            password: userPassword
        }
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem updating the information in the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("/users/update");
            // And forward to success page
            res.redirect("/users/update");
        }
    });
});


module.exports = router;
