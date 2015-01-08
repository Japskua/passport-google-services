/**
 * Created by Janne on 8.1.2015.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;