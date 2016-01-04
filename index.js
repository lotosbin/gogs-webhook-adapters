var _ = require('lodash');
var express = require('express');
var talkaiwebhook = require('./talkaiwebhook');
// Create an express web app
var app = express();
// Use middleware to parse incoming form bodies
var parser = require('body-parser');
app.use(parser.urlencoded({extended:true}));
app.use(parser.json());

// Create a webhook that handles an incoming SMS
app.post('/gogs2talkai', function(request, response) {
    console.log(request.body);
    var talkaiurl = request.query.url;
    var text =_.reduce(_.map(request.body.commits,function(e){return e.message}),function(result,e){return result+'\n'+e;});
    var data = {
  "authorName": request.body.sender.login,                          // 消息发送者的姓名，如果留空将显示为配置中的聚合标题
  "title": request.body.repository.namei+' ' +request.body.repository.description+ ' ' + request.body.ref + ' ' + request.body.after,                    // 聚合消息标题
  "text": text,
  "redirectUrl": request.body.compare_url,          // 跳转链接
  "imageUrl": request.body.sender.avatar_url             // 消息中可添加一张预览图片
    };
    talkaiwebhook(talkaiurl,data);
    response.type('text/xml');
    response.send('');
});
app.post('/github2talkai', function(request, response) {
    console.log(request.body);
    var talkaiurl = request.query.url;
    var rdata = JSON.parse(request.body);
    var data = {
  "authorName": rdata.sender.login,                          // 消息发送者的姓名，如果留空将显示为配置中的聚合标题
  "title": rdata.compare,
  "text": JSON.stringify(rdata.commits),                                     // 聚合消息正文
  "redirectUrl": radata.repository.html_url,          // 跳转链接
  "imageUrl": rdata.sender.avatar_url             // 消息中可添加一张预览图片
    };
    talkaiwebhook(talkaiurl,data);
    response.type('text/xml');
    response.send('');
});

// Have express create an HTTP server that will listen on port 3000
// or "process.env.PORT", if defined
app.listen(process.env.PORT || 3000);
