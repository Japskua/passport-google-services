/**
 * Created by Janne on 8.1.2015.
 */

var express = require('express');
var router = express.Router();


/* GET /login/ */
router.get('/', function(req, res){
    res.render('login', { user: req.user });
});

module.exports = router;

