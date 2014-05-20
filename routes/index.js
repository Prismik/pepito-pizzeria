var express = require('express');
var crypto = require('crypto');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Pepito Pizzeria' });
});

router.get('/login', function(req, res) {
    res.render('login', { title: 'Login' });
});

/* POST to authentificate users */
router.post('/authenticate', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userPassword = crypto.createHash('md5').update(req.body.password).digest('hex');

    // Set our collection
    var collection = db.get('usercollection');
    
    //Find user that matches the username and password
    collection.findOne({username : userName , password : userPassword},{},function(e,docs){
        if(docs != null){
        	//Add the user _id to a session variable
      		req.session.uid = docs._id;
      		
            res.location("/users");
            res.redirect("/users");
    	}else{
    		//Redirect to the login page with a "Bad credentials" error
    		res.location("/login");
			res.redirect("/login?e=1");
    	}
    });

});


module.exports = router;
