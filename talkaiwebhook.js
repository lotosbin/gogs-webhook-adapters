module.exports = function (talkaiurl,data){

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
