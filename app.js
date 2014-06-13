var env = process.env.NODE_ENV || 'development';
var config = require('./config/' + env);
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

// MongoDB
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.db);

// Routing controllers
var routes  = require('./routes/index');
var users   = require('./routes/users');
var orders  = require('./routes/orders');
var restos  = require('./routes/restaurants');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// General setup
app.set('globals', { logged: false });

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ 
    keys: ['uid', 'logged']
}));
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

// Init stuff - TO BE MOVED IN ANOTHER CLASS
Array.prototype.contains = function (element) {
   for (i in this)
       if (this[i] == element) return true;
   
   return false;
}

// Pre routing functions
function authChecker(req, res, next) {
    if (req.session.logged ||  ['/login', '/authenticate', '/register', '/users/add'].contains(req.path)) {
        next();
    }
    else {
       res.redirect("/login");
    }
}

app.use(authChecker);
app.use('/', routes);
app.use('/users', users);
app.use('/orders', orders);
app.use('/restaurants', restos)


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
