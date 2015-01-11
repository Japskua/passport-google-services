/**
 * Created by Janne on 11.1.2015.
 */

"use strict";

/**
 * Constructor for the metadata class that handles
 * all the metadata
 * @param {JSON} metadata A Json contain all the metadata of the video in question
 * @constructor
 */
function Metadata(metadata) {

    if ((metadata === null) || (metadata === undefined) || (metadata === "")) {
        throw new Error("Metadata was not defined!");
    }

    this.metadata = metadata;

}

/**
 * Gets the Creation time of the video
 * @return {Date} Returns the creation ISO Datetime of the video
 */
Metadata.prototype.getCreationTime = function () {

    // Check that the metadata exists
    if (this.metadata === null) {
        throw new Error("Metadata.getCreationTime() - metadata is not loaded!");
    }

    // Return the creation_time
    return this.metadata.streams[0].tags.creation_time;
};

/**
 * Gets the filesize of the videon in question
 * @return {Number} The size of the video file in bytes
 */
Metadata.prototype.getFileSize = function () {

    // Check that the metadata exists
    if (this.metadata === null) {
        throw new Error("Metadata.getFileSize - metadata is not loaded!");
    }

    // Return the creation_time
    return this.metadata.format.size;
};

/**
 * Gets the full contents of the video metadata
 * @return {JSON} JSON containing all the metadata information of the video
 */
Metadata.prototype.getFullMetadata = function () {
    // Check that the metadata exists
    if (this.metadata === null) {
        throw new Error("Metadata.DisplayFullMetadata() - metadata is not loaded!");
    }

    // Return the full metadata object
    return this.metadata;
};


module.exports = Metadata;