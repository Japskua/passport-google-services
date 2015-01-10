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
 * @param {Object} metadata Object containing the metadata to be added for the video
 * @param {Function} callback The regular (err, result) callback function
 * @constructor
 */
YoutubeManager.prototype.UploadVideo = function(videoPath, metadata, callback) {

    var media = {
        mimeType : 'video/mp4',
        body : fs.readFileSync(videoPath)
    };

    youtube.videos.insert({ part : 'snippet, status, player',
                            resource : metadata,
                            media : media},
                        function(err, result) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result);
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