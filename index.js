require("babel-register");

const _ = require('lodash');
const r = require('koa-route');
const Koa = require('koa');
const app = new Koa();
const talkaiwebhook = require('./webhooks/talkai');
var qqbot = require('./webhooks/qqbot');
const koaBody = require('koa-body');

app.use(koaBody());


// Create a webhook that handles an incoming SMS
app.use(r.post('/gogs2talkai', ({request, response}) => {
    console.log(request.body);
    const talkaiurl = request.query.url;
    const text = _.reduce(_.map(request.body.commits, function (e) {
        return e.message
    }), function (result, e) {
        return result + '\n' + e;
    });
    const data = {
        "authorName": request.body.sender.login,                          // 消息发送者的姓名，如果留空将显示为配置中的聚合标题
        "title": request.body.repository.name + ' ' + request.body.repository.description + ' ' + request.body.ref + ' ' + request.body.after,                    // 聚合消息标题
        "text": text,
        "redirectUrl": request.body.compare_url,          // 跳转链接
        "imageUrl": request.body.sender.avatar_url             // 消息中可添加一张预览图片
    };
    talkaiwebhook(talkaiurl,data);
    response.type('text/xml');
    response.send('');
}));
app.use(r.post('/github2talkai', ({request, response}) => {
    console.log(request.body);
    const talkaiurl = request.query.url;
    const rdata = JSON.parse(request.body);
    const data = {
        "authorName": rdata.sender.login,                          // 消息发送者的姓名，如果留空将显示为配置中的聚合标题
        "title": rdata.compare,
        "text": JSON.stringify(rdata.commits),                                     // 聚合消息正文
        "redirectUrl": radata.repository.html_url,          // 跳转链接
        "imageUrl": rdata.sender.avatar_url             // 消息中可添加一张预览图片
    };
    talkaiwebhook(talkaiurl,data);
    response.type('text/xml');
    response.send('');
}));
app.use(r.post('/oschina2talkai', ({request, response}) => {
    console.log(request.body);
    const talkaiurl = request.query.url;
    const b = request.body;
    const rdata = JSON.parse(request.body).push_data;
    const data = {
        "authorName": rdata.user.name,                          // 消息发送者的姓名，如果留空将显示为配置中的聚合标题
        "title": rdata.commits[0].message,
        "text": JSON.stringify(rdata.commits),                                     // 聚合消息正文
        "redirectUrl": radata.repository.url          // 跳转链接f
    };
    talkaiwebhook(talkaiurl,data);
    response.type('text/xml');
    response.send('');
}));
app.use(r.post('/oschina2qqbot', ({request, response}) => {
    console.log(request.body);
    const rdata = JSON.parse(request.body).push_data;
    const data = {
        "authorName": rdata.user.name,                          // 消息发送者的姓名，如果留空将显示为配置中的聚合标题
        "title": rdata.commits[0].message,
        "text": JSON.stringify(rdata.commits),                                     // 聚合消息正文
        "redirectUrl": radata.repository.url          // 跳转链接f
    };
    qqbot('group', 'test', `${data.authorName},${data.title},${data.text},${data.redirectUrl}`);
    response.type('text/xml');
    response.send('');
}));
// Have express create an HTTP server that will listen on port 3000
// or "process.env.PORT", if defined
const server = app.listen(process.env.PORT || 3000);
