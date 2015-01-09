/**
 * Created by Janne on 8.1.2015.
 */
var express = require('express'),
    router = express.Router(),
    google = require('googleapis'),
    OAuth2 = google.auth.OAuth2,
    GoogleInfo = require('./../bin/google-info');


/* GET /youtube/ */
router.get('/', ensureAuthenticated, function(req, res){

    var googleInfo = new GoogleInfo();

    // Try to connect to youtube here
    var plus = google.plus('v1');
    var oauth2client = new OAuth2();
    console.log("OAuth Client done", oauth2client);
    oauth2client.setCredentials({
        access_token : req.user.token,
        refresh_token : ""
    });

    var youtube = google.youtube('v3');
    youtube.playlists.list({ part : "snippet", mine : true, auth : oauth2client}, function(err, response) {
        if (err) {
            console.log(err);
            res.send(err);
        }

        //res.render('youtube', { user: req.user });
        res.send(response);
    });

    // WORKING GOOGLE PLUS PART. DON'T REMOVE!
/*
    plus.people.get({ userId : "me", auth : oauth2client}, function(err, response) {
        if (err) {
            res.json({error : err});
        }

        //res.render('youtube', { user: req.user });
        res.send(response);
    });
*/

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
