var request = require('request');
module.exports = function (talkaiurl, data) {
    request({
        url: talkaiurl,
        method: 'POST',
        form: data
    }, function (error, response, body) {
        if (error) {
            console.log(error);
        }
        else {

        }
    });
};
