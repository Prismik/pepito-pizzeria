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

    user = usermodel.findOne({ userid: req.session.uid }).exec(function (err, user) {
        res.render('users/update', {

            "username": user.username,
            "useremail": user.email,
            // "userbirthdate" : docs.birthdate,
            "useraddress": user.address,
            "userphone": user.phone,
            "userpassword": crypto.createHash('md5').update(req.body.password).digest('hex'),
            "userid": user._id


        });
    });

});

/* POST to Add User Service */
router.post('/add', function (req, res) {
    //connect the schema
    var user = userschema.getUserModel(req.db);

    var newUser = new user({
        username: req.body.username
        //, userbirthdate: req.body.birthdate
        , useraddress: req.body.address
        , userphone: req.body.phone
        , useremail: req.body.email
        , userpassword: req.body.password

    })

    newUser.save(function (err, newUser) {
        if (err) {
            console.log(err);
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
router.post('/updateuser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.email;
   // var userBirthDate = req.body.birthdate;
    var userAddress = req.body.address;
    var userPhone = req.body.phone;
    var userPassword = req.body.password;
    var userId = req.body.userid;


    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.update(
    {
	    _id : userId
    },
    {
    "$set":
    	{
	    	"username" : userName,
            "email" : userEmail,
           // "birthdate" : userBirthDate,
            "address" : userAddress,
            "phone" : userPhone,
            "password" : userPassword
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
