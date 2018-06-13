var config = require('../config');
var request = require('request');

module.exports = function (type, to, msg) {
    request({
        url: `${config.webhooks.qqbot.host}/send?type=${type}&to=${to}&msg=${encodeURIComponent(msg)}&token=${config.webhooks.qqbot.token}`,
        method: 'GET',
    }, function (error, response, body) {
        if (error) {
            console.log(error);
        }
        else {

        }
    });
};
