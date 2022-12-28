var http = require("http");
var express = require("express");
var app = express();

app.use(function(req,res ){
	res.send("<h1>안녕하세요!</h1>");
});

http.createServer(app).listen(52273, function(){
	console.log("서버가 가동되었습니다.  http://127.0.0.1:52273");
});