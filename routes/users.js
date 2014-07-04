var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var User = require('../schema/user').User;
var AccountType = require('../schema/accountType').AccountType;

/* GET users listing. */
router.get('/', function (req, res) {
    var accountType = AccountType.find();
    var userList = [];

    /*User.aggregate([{$group:{_id:"$accountType",accounts:{$push:"$$ROOT"}}}]).exec(function (err, users){
        for (var i=0; i < users.length; i++){
            userCategory = users[i];
            AccountType.findOne({ _id: users[i]._id}).exec(function (err, docs) {
                userCategory.name = docs.name;
            });

            userList.push(userCategory);
        }
        console.log(userList);
    });*/
    
    User.find().exec(function (err, users) {

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
    user = User.findOne({ _id: req.session.uid }).exec(function (err, docs) {
        res.render('users/update', {
            username : docs.username,
            useremail : docs.email,
            userbirthdate : docs.birthdate,
            useraddress : docs.address,
            postal : docs.postal,
            userphone : docs.phone,
            accountType: docs.accountType,
            active: 'account',
            userid : docs._id
        });
    });

});

//Ajax request for validating if email address is used
router.post('/verifyEmail', function(req,res){
    var db = req.db;
    var validateEmail = req.body.validateEmail;
    User.findOne({email:validateEmail}).exec(function(e,docs){
        if(docs!=null){
	        res.send(false);
        }else{
	        res.send(true);
        }
    });
});

/* POST to Add User Service */
router.post('/add', function (req, res) {
    AccountType.findOne({ name: 'client' }, function (err, type) {
        console.log(type);

        //build address from address and postal code
        var arrAddr = new Array();

        for (var i = 0; i < req.body.address.length; i++) {
            arrAddr[i] = new { address: req.body.address[i], postalCode: req.body.postal[i]};
        }

        var newUser = new User({
            username: req.body.username
            , accountType: type._id
            , birthdate: req.body.birthdate
            , address: arrAddr
            , defaultAddress: 0
            , phone: req.body.phone
            , email: req.body.email
            , password: crypto.createHash('md5').update(req.body.password).digest('hex')
        });

        newUser.save(function (err, newUser) {
            if (err) {
                console.log(err);
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("/login");
                // And forward to success page
                res.redirect("/login?message=User has been created");
                console.log(newUser);
            }
        });
    });
});

/* POST to Update User */
router.post('/updateuser', function (req, res) {
    var user = User.findOneAndUpdate(
        { _id: req.body.userid },
        {
            username: req.body.username,
            accountType: req.body.accountType,
            email: req.body.email,
            birthdate: req.body.birthdate,
            address: req.body.address,
            phone: req.body.phone,
            password: crypto.createHash('md5').update(req.body.password).digest('hex')
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
        }
    );
});


module.exports = router;
