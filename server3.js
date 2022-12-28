var http = require("http");
var express = require("express");
var app = express();

app.use(express.static("public"));
app.use(app.router);

app.all("/list", function(req,res){
	res.send("<h1>글 목록보기</h1>");
});

app.all("/write", function(req,res){
	res.send("<h1>글 작성하기</h1>");
});

app.all("/update", function(req,res){
	res.send("<h1>글 수정하기</h1>");
});

http.createServer(app).listen(52273, function(){
	console.log("서버가 가동되었습니다.  http://127.0.0.1:52273");
});