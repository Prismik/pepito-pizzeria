var express = require('express');
var router = express.Router();
var Permission = require('../schema/permission').Permission;
var AccountType = require('../schema/accountType').AccountType;

router.get('/', function(req, res) {
    Permission.find().exec(function (err,docs) {
        res.render('permissions/list', {
            title: 'Pepito Pizzeria - Permissions',
            header: 'Permissions',
            active: 'perms',
            perms: docs
        });
    });
});

router.post('/update', function(req, res) {
    var perms = req.body.permissions.split(/\r\n|\r|\n/g);
    for (var i = 0; i != perms.length; ++i) {
        if (perms[i].trim() != "")
            Permission.update({ name: perms[i] }, 
                { $set: { name: perms[i] } }, 
                { upsert: true }, function(){});
    }
});

module.exports = router;
