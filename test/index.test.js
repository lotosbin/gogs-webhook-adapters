require("babel-register");

var request = require('request');
describe('POST //oschina2qqbot', function () {
    it('no error', function (done) {
        // newer mocha versions accepts promises as well
        let data = {
            push_data: {
                user: {
                    name: "test"
                },
                commits: [
                    {
                        message: "test message"
                    }
                ],
                repository: {
                    url: "http://www.baidu.com"
                }
            }
        };
        request({
            url: 'http://localhost:3000/oschina2qqbot',
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
        }, function (error, response, body) {
            console.log(error);
            console.log(body);
            if (error)
                done(error);
            else
                done()
        })
    })
});
// describe('POST //gogs2talkai', function () {
//     it('result data', function (done) {
//         // newer mocha versions accepts promises as well
//         return request(server)
//             .post('/gogs2talkai')
//             .set('Accept', 'application/json')
//             .expect(200, {
//                 id: '1',
//                 name: 'John Math'
//             }, done)
//     })
// });