/**
 * Created by Janne on 11.1.2015.
 */

"use strict";

var ffmpeg = require('fluent-ffmpeg');
var Config = require('./../../config.js');
var Metadata = require('./metadata.js');

/**
 * Constructor for the Metadata Parser of Videos
 * @constructor
 */
function MetadataParser() {

    var cfg = new Config();

    ffmpeg.setFfmpegPath(cfg.ffmpegPath);
    ffmpeg.setFfprobePath(cfg.ffprobePath);

    this.metadata = "";
}

/**
 * Parses the given video for the creation time and returns it as string
 * @param source {String} The video source to read
 * @param callback {Function} The callback function
 * @return {String} Returns a string containing the creation time of the video
 * @constructor
 */
MetadataParser.prototype.ParseMetadata = function (source, callback) {

    console.log("Starting to analyze the metadata");

    source = "/nauhoite.mp4";

    // Probe for the metadata information of the video
    ffmpeg.ffprobe(source, function (err, metadata) {

        // If there is an error, return the message
        if (err) {
            console.log(err);
            callback(err);
            return;
        }

        // Got the results, so save them in the metadata file
        var metadataObject = new Metadata(metadata);

        // Return the metadata object
        callback(null, metadataObject);
    });

};


module.exports = MetadataParser;