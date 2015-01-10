/**
 * Created by Janne on 8.1.2015.
 */
var express = require('express'),
    router = express.Router(),
    google = require('googleapis'),
    OAuth2 = google.auth.OAuth2,
    YoutubeManager = require('./../js/youtube-manager');


router.get('/playlists/', ensureAuthenticated, function(req, res) {
    var youtubeManager = new YoutubeManager();
    youtubeManager.MyPlaylists(function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.get('/playlist/videos/', ensureAuthenticated, function(req, res) {
    var youtubeManager = new YoutubeManager();
    youtubeManager.VideosInPlaylist("PLX0jcZ2eQoOa6AISCWiwNAWSlNVVSup5W", function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.get('/videos/add', ensureAuthenticated, function(req, res) {


    res.render('add-video');
});

router.get('/upload/', ensureAuthenticated, function(req, res) {

    var youtubeManager = new YoutubeManager();

    // Create metadata for the upload
    var metadata = youtubeManager.CreateMetadata("Test Title",
                                                 "Test description",
                                                 "private", // privacy status
                                                 ["test", "video", "trainer4"]); // tags

    // Then, upload the video
    youtubeManager.UploadVideo('tmp/video.mp4', metadata, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });


    //res.send("Upload page");
});

router.post('/video/', ensureAuthenticated, function(req, res) {
    console.log("Adding video to youtube");
    var youtubeManager = new YoutubeManager();

    console.log(req.body);


    res.send("Received POST");
});

/* GET /youtube/ */
router.get('/', ensureAuthenticated, function(req, res){


    var oauth2client = new OAuth2();
    console.log("OAuth Client done", oauth2client);
    oauth2client.setCredentials({
        access_token : req.user.token,
        refresh_token : ""
    });

    // Set the authentication as global
    google.options({ auth : oauth2client});

    res.render('youtube');
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
