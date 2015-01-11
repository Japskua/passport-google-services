/**
 * Created by Janne on 8.1.2015.
 */
var express = require('express'),
    router = express.Router(),
    google = require('googleapis'),
    OAuth2 = google.auth.OAuth2,
    YoutubeManager = require('./../js/youtube-manager'),
    busboy = require('connect-busboy'),
    fs = require('fs');


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
    youtubeManager.UploadVideo('tmp/video.mp4', 'video/mp4', metadata, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });

});

function removeFile(filePath, callback) {
    // Just remove the file
    fs.unlink(filePath, function(err) {
        if(err) {
            callback(err, null);
        } else {
            callback();
        }
    });
}

router.post('/video/', ensureAuthenticated, function(req, res) {
    console.log("Adding video to youtube");
    var youtubeManager = new YoutubeManager();

    // Initialize the filestream
    var fstream;
    // Make a pipe
    req.pipe(req.busboy);
    // Then, use busboy to read the file
    console.log("Starting to work with busboy");
    //console.log("req.busboy is:", req.busboy);
    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

        console.log("Getting stuff with the following info", "fieldName:", fieldname, "filename", filename, "encoding:", encoding, "mimetype:", mimetype);

        console.log("Uploading:", filename);

        var path = __dirname + '/../tmp/' + filename;

        console.log("Uploading to:", path);

        // Create writestream for the data
        fstream = fs.createWriteStream(path);

        // Then, pipe the data to the file stream
        file.pipe(fstream);

        // And then finally close the file stream
        fstream.on('close', function(err) {
            if (err) {
                res.send(err);
                return;
            }

            var metadata = youtubeManager.CreateMetadata("Practise Title", "Video Description", "private", ["trainer4"]);

            // TODO: 2. Upload to youtube
            youtubeManager.UploadVideo(path, mimetype, metadata, function(err, result) {
                if (err) {
                    res.send(err);
                    return;
                }

                // Otherwise, keep on going
                // 3. Remove the file
                removeFile(path, function(err) {
                    if (err) {
                        res.send(err);
                        return;
                    }
                    res.send("Upload to youtube done!", result);
                });
            });
        })
    });
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
