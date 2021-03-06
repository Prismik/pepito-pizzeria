var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var mail = require('../lib/mail');
var User = require('../schema/user').User;

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { 
        title: 'Pepito Pizzeria',
        active: 'home'
    });
});

router.get('/login', function(req, res) {
    console.log("Test")
    if (res.app.settings['globals'].logged)
        res.redirect("/");
    else
        res.render('login', { 
            title: 'Pepito Pizzeria - Login',
            success: req.query.message,
            header: 'Login',
            authRequired: true
        });
});

router.get('/mail', function(req, res) {
   res.render('test', { 
        title: 'Pepito Pizzeria - Test', 
        header: 'Test',
        authRequired: true
    });
});

router.get('/register', function(req, res) {
    res.render('register', {
         title: 'Pepito Pizzeria - Register',
         header: 'Register', 
         authRequired: true
    });
});

router.get('/logout', function(req, res) {
    //Add the user_id to a session variable
    var sess = req.session;
    sess.uid = null;
    sess.logged = false;
    sess.save();

    // Redirect user
    res.location("/login");
    res.redirect("/login");
});

/* POST to authentificate users */
router.post('/authenticate', function (req, res) {
    // Get our form values. These rely on the "name" attributes
    var userEmail = req.body.email;
    var userPassword = crypto.createHash('md5').update(req.body.password).digest('hex');

    User.findOne({ email: userEmail, password: userPassword }).exec(function (err, docs) {
        if (docs != null) {
            //Add the user_id to a session variable
            var sess = req.session;
            sess.uid = docs._id;
            sess.logged = true;
            sess.save();

            console.log(userEmail + ' is now logged')

            res.location("/");
            res.redirect("/");
        } else {
            console.log('Bad credentials');

            //Redirect to the login page with a "Bad credentials" error
            res.render('login', {
                error: 'Bad credentials',
                title: 'Pepito Pizzeria - Login',
                header: 'Login',
                authRequired: true
            });
        }
    });
});


module.exports = router;
