var express = require('express');
var router = express.Router();
var Permission = require('../schema/permission').Permission;
var AccountType = require('../schema/accountType').AccountType;
var helper = require('../lib/helper');

router.get('/', function(req, res) {
    Permission.find().exec(function (err,docs) {
        AccountType.find().exec(function (err,accounts) {
            for (var i = 0; i != accounts.length; ++i) {
                var acc = accounts[i];
                for (var j = 0; j != acc.rights.length; ++j) {
                    acc.rights[j] = helper.getObjectFromId(docs, acc.rights[j]);
                }
            }

            res.render('permissions/list', {
                title: 'Pepito Pizzeria - Permissions',
                header: 'Permissions',
                active: 'perms',
                perms: docs,
                accs: accounts
            });
        });
    });
});

router.post('/update', function(req, res) {
    var perms = req.body.permissions.split(/\r\n|\r|\n/g);
    for (var i = 0; i != perms.length; ++i) {
        var p = perms[i].trim();
        if (p != "") {
            Permission.find({ name: p }, function (err, docs) {
                if (!docs.length) {
                    var newPerm = new Permission({ name: p });
                    newPerm.save(function (err, newDoc) {
                        if (err) {
                            console.log('Error to add the perm');
                            res.send("error")
                        }
                        else
                            res.send("success");
                    });
                }
            });
        }
    }
});

module.exports = router;
