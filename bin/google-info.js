function GoogleInfo() {
    this.GOOGLE_CLIENT_ID = "630220068318-hmvth59daua2p3je12hn7j2i2h8tgo9k.apps.googleusercontent.com";
    this.GOOGLE_CLIENT_SECRET = "BSvpx4ZBOJQ5gIBk0eyl_aBw";
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