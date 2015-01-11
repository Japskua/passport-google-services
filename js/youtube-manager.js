/**
 * Created by Janne on 9.1.2015.
 */

var google = require('googleapis'),
    youtube = google.youtube('v3'),
    fs = require('fs');

function YoutubeManager () {

}

YoutubeManager.prototype.MyPlaylists = function(callback) {

    youtube.playlists.list({ part : "snippet", mine : true}, function(err, result) {
    //youtube.playlists.list({ part : "snippet", mine : true, auth : oauth2client}, function(err, result) {
        if (err) {
            callback(err, null);
        }

        callback(null, result);
    });

};

YoutubeManager.prototype.VideosInPlaylist = function(playlistId, callback) {

    youtube.playlistItems.list({ part : "snippet", playlistId : playlistId}, function(err, result) {
        if (err) {
            callback(err, null)
        }

        callback(null, result);
    });

};


YoutubeManager.prototype.MyVideos = function(callback) {

    youtube.videos.list({ part : "id,snippet"}, function(err, result) {
        if(err) {
            callback(err, null);
        }

        callback(null, result);
    });
};

/**
 * Uploads a video to youtube
 * @param {String} videoPath The local filesystem path to the video
 * @param {String} mimeType The mime type of the file in question
 * @param {Object} metadata Object containing the metadata to be added for the video
 * @param {Function} callback The regular (err, result) callback function
 * @constructor
 */
YoutubeManager.prototype.UploadVideo = function(videoPath, mimeType, metadata, callback) {
    var media = {
        mimeType : mimeType,
        body : fs.readFileSync(videoPath)
    };

    youtube.videos.insert({ part : 'snippet, status, player',
                            resource : metadata,
                            media : media},
                        function(err, uploadResult) {
        if (err) {
            callback(err, null)
        } else {

            var playlistId = "PLX0jcZ2eQoOa6AISCWiwNAWSlNVVSup5W";

            console.log("Video ID is:", uploadResult.id);

            var youtubeManager = new YoutubeManager();
            // Okay, now we need to set it to the proper play list
            youtubeManager.insertToPlaylist(uploadResult.id, playlistId, function(err) {
                if(err) {
                    callback(err, null);
                } else {
                    // Otherwise, pushing to the proper playlist succeeded
                    // Return the upload results
                    callback(null, uploadResult);
                }
            });
        }
    });
};

/**
 * Inserts the given video to playlist
 * @param {String} videoId The ID of the video to add
 * @param {String} playlistId The ID of the playlist where to add the video
 * @param {Function} callback Callback function
 */
YoutubeManager.prototype.insertToPlaylist = function (videoId, playlistId, callback) {

    console.log("Adding to playlist:", playlistId);

    // TODO: Change this to work properly!

    // Create the snippet to insert
    var snippet = {
        playlistId: playlistId,
        resourceId: {
            videoId: videoId,
            kind: "youtube#video"
        }};

    var params = {
        part : "snippet",
        resource : {
            snippet : snippet
        }
    };

    youtube.playlistItems.insert(params, function(err, result) {
        if(err) {
            callback(err);
        } else {
            callback();
        }

    });
};


/**
 * Creates the metadata for inserting a new video
 * @param {String} title The title of the video
 * @param {String} description The description of the video to be inserted
 * @param {String} privacyStatus The privacy status to be given to the video (private, unlisted, public)
 * @param {Array} tags An array of tags that should be inserted
 * @returns {{snippet: {title: *, description: *, tags: *}, status: {privacyStatus: *}}}
 */
YoutubeManager.prototype.CreateMetadata = function (title, description, privacyStatus, tags) {

    return {
        snippet : { title : title, description : description, tags : tags},
        status : { privacyStatus : privacyStatus}
    };

};

module.exports = YoutubeManager;