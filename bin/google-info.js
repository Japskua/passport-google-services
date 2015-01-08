function GoogleInfo() {
    this.GOOGLE_CLIENT_ID = "CLIENT ID GOES HERE";
    this.GOOGLE_CLIENT_SECRET = "CLIENT SECRET GOES HERE";
}

/**
 * Returns the Client ID
 * @returns {string} Client ID
 * @constructor
 */
GoogleInfo.prototype.ClientId = function() {
    return this.GOOGLE_CLIENT_ID;
};

/**
 * Returns the Client Secret
 * @returns {string} Client Secret key
 * @constructor
 */
GoogleInfo.prototype.ClientSecret = function() {
    return this.GOOGLE_CLIENT_SECRET;
};

module.exports = GoogleInfo;