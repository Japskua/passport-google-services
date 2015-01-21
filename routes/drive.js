/**
 * Created by Janne on 21.1.2015.
 */
var express = require('express');
var router = express.Router();

/* GET /drive/ */
router.get('/', ensureAuthenticated, function(req, res) {
    res.render('drive', { user : req.user});
});

/* GET /drive/example1 */
router.get('/example1', ensureAuthenticated, function(req, res) {
    res.render('example1', {user : req.user});
});

/* GET /drive/example2 */
router.get('/example2', ensureAuthenticated, function(req, res) {
    res.render('example2', {user : req.user});
});

/* GET /drive/example3 */
router.get('/example3', ensureAuthenticated, function(req, res) {
    res.render('example3', {user : req.user});
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
