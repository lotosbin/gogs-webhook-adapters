var express = require('express');
// Create an express web app
var app = express();

// Use middleware to parse incoming form bodies
var parser = require('body-parser');
app.use(parser.urlencoded({extended:true}));
app.use(parser.json());

// Create a webhook that handles an incoming SMS
app.post('/gogs2talkai', function(request, response) {
    console.log(request.body);
    //from gogs
    /*{
  "secret": "",
  "ref": "refs/heads/develop",
  "before": "47df562ceddfaab3471e635e59039c03f47808e2",
  "after": "2cee0f84c0c62fa85382258705353c7d24eb7fee",
  "compare_url": "https://try.gogs.io/gogs/gogs/compare/47df562ceddfaab3471e635e59039c03f47808e2...2cee0f84c0c62fa85382258705353c7d24eb7fee",
  "commits": [
    {
      "id": "2cee0f84c0c62fa85382258705353c7d24eb7fee",
      "message": "Revert \"fix CI...\"\n\nThis reverts commit 94b2816446d1d700d1af0ec166e63375da6612f3.\n",
      "url": "https://try.gogs.io/gogs/gogs/commit/2cee0f84c0c62fa85382258705353c7d24eb7fee",
      "author": {
        "name": "Unknwon",
        "email": "u@gogs.io",
        "username": "unknwon"
      }
    },
    {
      "id": "94b2816446d1d700d1af0ec166e63375da6612f3",
      "message": "fix CI...\n",
      "url": "https://try.gogs.io/gogs/gogs/commit/94b2816446d1d700d1af0ec166e63375da6612f3",
      "author": {
        "name": "Unknwon",
        "email": "u@gogs.io",
        "username": "unknwon"
      }
    },
    {
      "id": "8411b50f5d4e3b30d7d601612ee2aa5e4921c968",
      "message": "work on #1882\n",
      "url": "https://try.gogs.io/gogs/gogs/commit/8411b50f5d4e3b30d7d601612ee2aa5e4921c968",
      "author": {
        "name": "Unknwon",
        "email": "u@gogs.io",
        "username": "unknwon"
      }
    },
    {
      "id": "8a87bee4346968e280e9b9a6e56373c1d2e1c357",
      "message": "what's wrong with go tip?\n",
      "url": "https://try.gogs.io/gogs/gogs/commit/8a87bee4346968e280e9b9a6e56373c1d2e1c357",
      "author": {
        "name": "Unknwon",
        "email": "u@gogs.io",
        "username": "unknwon"
      }
    },
    {
      "id": "1dfa693a5cd221fa43f10df3a9dc216753f82547",
      "message": "fix CI!!\n",
      "url": "https://try.gogs.io/gogs/gogs/commit/1dfa693a5cd221fa43f10df3a9dc216753f82547",
      "author": {
        "name": "Unknwon",
        "email": "u@gogs.io",
        "username": "unknwon"
      }
    }
  ],
  "repository": {
    "id": 140,
    "name": "gogs",
    "url": "https://try.gogs.io/gogs/gogs",
    "description": "Gogs(Go Git Service) is a painless self-hosted Git Service written in Go.",
    "website": "",
    "watchers": 6,
    "owner": {
      "name": "gogs",
      "email": "u@gogs.io",
      "username": "gogs"
    },
    "private": false
  },
  "pusher": {
    "name": "unknwon",
    "email": "u@gogs.io",
    "username": "unknwon"
  },
  "sender": {
    "login": "unknwon",
    "id": 1,
    "avatar_url": "https://try.gogs.io///1.gravatar.com/avatar/d8b2871cdac01b57bbda23716cc03b96"
  }
}*/
    //call talk.ai
    var data = {
  "authorName": "Stack",                          // 消息发送者的姓名，如果留空将显示为配置中的聚合标题
  "title": "Winter is coming",                    // 聚合消息标题
  "text": "",                                     // 聚合消息正文
  "redirectUrl": "https://talk.ai/site",          // 跳转链接
  "imageUrl": "http://your.image.url"             // 消息中可添加一张预览图片
};
  var request = require('request');
    request({url:'https://jianliao.com/v2/services/webhook/06c695dc8517caa76e40679dcad20c905635ad40',
    method:'POST',
    form:data},function(error,response,body){
      if(error){
        console.log(error);
      }
      else{

      }
    });
    response.type('text/xml');
    response.send('');
});

// Have express create an HTTP server that will listen on port 3000
// or "process.env.PORT", if defined
app.listen(process.env.PORT || 3000);
