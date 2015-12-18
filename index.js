var express = require('express');
// Create an express web app
var app = express();
function talkaiwebhook(talkaiurl,data){

  var request = require('request');
    request({url:talkaiurl,
    method:'POST',
    form:data},function(error,response,body){
      if(error){
        console.log(error);
      }
      else{

      }
    });
}
// Use middleware to parse incoming form bodies
var parser = require('body-parser');
app.use(parser.urlencoded({extended:true}));
app.use(parser.json());

// Create a webhook that handles an incoming SMS
app.post('/gogs2talkai', function(request, response) {
    console.log(request.body);
    var talkaiurl = request.query.url;
    //call talk.ai
    var data = {
  "authorName": request.body.sender.login,                          // 消息发送者的姓名，如果留空将显示为配置中的聚合标题
  "title": request.body.ref + ' ' + request.body.after,                    // 聚合消息标题
  "text": JSON.stringify(request.body.commits),                                     // 聚合消息正文
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
    //call talk.ai
    var data = {
  "authorName": request.body.sender.login,                          // 消息发送者的姓名，如果留空将显示为配置中的聚合标题
  "title": request.body.comment.body,
  "text": JSON.stringify(request.body.comment),                                     // 聚合消息正文
  "redirectUrl": request.body.repository.html_url,          // 跳转链接
  "imageUrl": request.body.sender.avatar_url             // 消息中可添加一张预览图片
};
    talkaiwebhook(talkaiurl,data);
    response.type('text/xml');
    response.send('');
});

// Have express create an HTTP server that will listen on port 3000
// or "process.env.PORT", if defined
app.listen(process.env.PORT || 3000);
