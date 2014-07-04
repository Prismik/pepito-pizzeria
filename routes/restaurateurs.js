var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var User = require('../schema/user').User;
var AccountType = require('../schema/accountType').AccountType;

/* GET users listing. */
router.get('/', function (req, res) {
    User.find().exec(function (err, users) {
        res.render('restaurateurs/list', {
            title: 'Pepito Pizzeria - Restaurateurs',
            header: 'Restaurateurs',
            active: 'restaurateurs',
            userlist: users
        });
    });
});

/* GET New User page. */
router.get('/create', function(req, res) {
    res.render('restaurateurs/create', { title: 'Pepito Pizzeria - Add New Restaurateur' , header: 'Create restaurateur'});
});

/* GET Manage User page. */
router.post('/update', function (req, res) {
    user = User.findOne({ _id: req.body.restaurateursId }).exec(function (err, docs) {
        res.render('restaurateurs/update', {
            username : docs.username,
            useremail : docs.email,
            userbirthdate : docs.birthdate,
            useraddress : docs.address,
            postal : docs.postal,
            userphone : docs.phone,
            accountType: docs.accountType,
            active: 'restaurateurs',
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
    AccountType.findOne({ name: 'client' },function (err, type) {
        console.log(type);
        var newUser = new User({
            username: req.body.username
            , accountType: type._id
            , birthdate: req.body.birthdate
            , address: req.body.address
            , defaultAddress: 0
            , postal: req.body.postal
            , phone: req.body.phone
            , email: req.body.email
            , password: crypto.createHash('md5').update(req.body.password).digest('hex')
        });
    });
});

/* POST to Update User */
router.post('/updateRestaurateur', function (req, res) {
    var user = User.findOneAndUpdate(
        { _id: req.body.restaurateursId },
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
                res.location("/restaurateurs/");
                // And forward to success page
                res.redirect("/restaurateurs/");
            }
        }
    );
});

router.post('/delete', function (req, res) {
    var db = req.db;
    User.remove({ "_id": req.body.restaurateurId }, function (err) {
        if (err) {
            res.send("There was a problem deleting restaurant.");
        }
        else {
            res.location("/restaurateurs");
            res.redirect("/restaurateurs");
        }
    });
});


module.exports = router;
