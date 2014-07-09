var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var User = require('../schema/user').User;
var AccountType = require('../schema/accountType').AccountType;

/* GET users listing. */
router.get('/', function (req, res) {
    var user = new User();
    user.getRestaurateurs(function (err, users) {
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
    var validateEmail = req.body.validateEmail;
    User.findOne({email:validateEmail}).exec(function(e,docs) {
        if(docs!=null)
	        res.send(false);
        else
	        res.send(true);
    });
});

/* POST to Add User Service */
router.post('/add', function (req, res) {
    var arrAddr = new Array();
    if (typeof(req.body.address) == typeof("string")) {
        arrAddr[0] = { address: req.body.address, postalCode: req.body.postal }
    }
    else {
        for (var i = 0; i < req.body.address.length; i++) {
            arrAddr[i] = { address: req.body.address[i], postalCode: req.body.postal[i] };
        }
    }

    AccountType.findOne({ name: "restaurateur"}, function (e, type) {
        console.log(type);
        var newUser = new User({
            username: req.body.username
            , birthdate: req.body.birthdate
            , address: arrAddr
            , defaultAddress: 0
            , postal: req.body.postal
            , phone: req.body.phone
            , email: req.body.email
            , password: crypto.createHash('md5').update(req.body.password).digest('hex')
            , accountType: type._id
        });

        console.log(newUser);
        newUser.save(function (err, newUser) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                res.location("/restaurateurs/");
                // And forward to success page
                res.redirect("/restaurateurs/");
            }
        });
    });
});

/* POST to Update User */
router.post('/updateRestaurateur', function (req, res) {
    if (req.body.password=="") {
        var user = User.findOneAndUpdate(
        { _id: req.body.restaurateursId },
        {
            username: req.body.username,
            accountType: req.body.accountType,
            email: req.body.email,
            birthdate: req.body.birthdate,
            address: req.body.address,
            phone: req.body.phone
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
    } else {
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
    };
});

router.post('/delete', function (req, res) {
    User.remove({ _id: req.body.restaurateurId }, function (err) {
        if (err)
            res.send("There was a problem deleting restaurant.");
        else {
            res.location("/restaurateurs");
            res.redirect("/restaurateurs");
        }
    });
});


module.exports = router;
