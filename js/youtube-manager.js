/**
 * Created by Janne on 9.1.2015.
 */

var google = require('googleapis'),
    youtube = google.youtube('v3');

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

YoutubeManager.prototype.AddVideo = function(callback) {

};

module.exports = YoutubeManager;