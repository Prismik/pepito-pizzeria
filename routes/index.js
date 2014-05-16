var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Pepito Pizzeria' });
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Login' });
});


module.exports = router;
