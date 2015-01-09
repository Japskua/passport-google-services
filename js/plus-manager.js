/**
 * Created by Janne on 9.1.2015.
 */

var google = require('googleapis'),
    plus = google.plus('v1');

function PlusManager() {

}

PlusManager.prototype.Me = function(callback) {

    plus.people.get({userId: "me"}, function (err, result) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result);
        }
    });
};


module.exports = PlusManager;