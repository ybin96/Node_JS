var http = require("http");
var express = require("express");
var app = express();

app.use(express.static("public"));
app.use(app.router);

var items = [
	{name:"우유",price:"2000"},
	{name:"홍차",price:"5000"},
	{name:"커피",price:"3000"}
];

app.all("/item/html",function(req,res){
	var output =  "";
	output += "<!doctype html>";
	output += "<html>";
	output += "<body>";
	items.forEach(function(item){
		output += "<div>";
		output += "<h1>"+item.name+"</h1>";
		output += "<h2>"+item.price+"</h2>";
		output += "</div>";

	});
	output += "</body>";
	output += "</html>";
	res.send(output);	
});

app.all("/item/json",function(req,res){
	res.send(items);
});

app.all("/item/xml",function(req,res){
	res.type("text/xml");
	var output = "";
	output += "<?xml version='1.0' encoding='UTF-8'?>";
	output += "<items>";
	items.forEach(function(item){
		output += "<item>";
		output += "<name>"+item.name+"</name>";
		output += "<price>"+item.price+"</price>";
		output += "</item>";
	});
	output += "</items>";
	res.send(output);
});

http.createServer(app).listen(52273, function(){
	console.log("서버가 가동되었습니다.  http://127.0.0.1:52273");
});













