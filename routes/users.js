var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var userschema = require('../schema/userSchema');

/* GET users listing. */
router.get('/', function (req, res) {

    var usermodel = userschema.getUserModel(req.db);
    usermodel.find().exec(function (err, users) {
        res.render('users/list', {
            title: 'Pepito Pizzeria - Users',
            header: 'Users',
            active: 'listuser',
            userlist: users
        });
    });

});

/* GET New User page. */
router.get('/create', function(req, res) {
    res.render('users/create', { title: 'Pepito Pizzeria - Add New User' , header: 'Create user'});
});

/* GET Manage User page. */
router.get('/update', function (req, res) {

    var usermodel = userschema.getUserModel(req.db)

    user = usermodel.findOne({ _id: req.session.uid }).exec(function (err, docs) {
        res.render('users/update', {

            username : docs.username,
            useremail : docs.email,
            userbirthdate : docs.birthdate,
            useraddress : docs.address,
            userphone : docs.phone,
            active: 'account',
            userid : docs._id
        });
    });

});

/* POST to Add User Service */
router.post('/add', function (req, res) {
    //connect the schema
    var user = userschema.getUserModel(req.db);

    var newUser = new user({
        username: req.body.username
        , birthdate: req.body.birthdate
        , address: req.body.address
        , phone: req.body.phone
        , email: req.body.email
        , password: crypto.createHash('md5').update(req.body.password).digest('hex')

    })

    newUser.save(function (err, newUser) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.render('login', {
                success: 'Account successfully created',
                title: 'Pepito Pizzeria - Login',
                header: 'Login',
                authRequired: true
            });
        }
    });

});

/* POST to Update User */
router.post('/updateuser', function (req, res) {

    var userModel = userschema.getUserModel(req.db);

    var user = userModel.findOneAndUpdate(
        { _id: req.body.userid },
        {
            username : req.body.username,
            email : req.body.email,
            birthdate : req.body.birthdate,
            address : req.body.address,
            phone : req.body.phone,
            password : crypto.createHash('md5').update(req.body.password).digest('hex')
        },
        function (err, doc) {
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
