/**
 * Created by Janne on 8.1.2015.
 */
var express = require('express');
var router = express.Router();


/* GET /youtube/ */
router.get('/', ensureAuthenticated, function(req, res){

    // Try to connect to youtube here


    res.render('youtube', { user: req.user });
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}

module.exports = router;
