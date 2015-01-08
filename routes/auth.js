/**
 * Created by Janne on 8.1.2015.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login', // Basic profile & circles
            'https://www.googleapis.com/auth/plus.profile.emails.read', // View email
            'https://www.googleapis.com/auth/drive', // View and manage drive
            'https://www.googleapis.com/auth/youtube' // Manage youtube account
        ] }),

    function(req, res){
        // The request will be redirected to Google for authentication, so this
        // function will not be called.
});

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
});


module.exports = router;






