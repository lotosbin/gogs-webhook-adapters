var request = require('request');

request('http://localhost:3000/oschina2qqbot', {method: "POST"}, function (error, response, body) {
    console.log(error);
    console.log(body)
});