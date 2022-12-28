var http = require("http");
var express = require("express");
var app = express();

app.use(express.static("public"));
app.use(app.router);

const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri ="mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbName = "mydb";
const colName = "dept";

app.all("/dept/list",function(req,res){
	async function run() {
		try {
		  await client.connect();
		  const database = client.db(dbName);
		  const movies = database.collection(colName);
		  const cursor = movies.find();
		  cursor.toArray(function(err,docs){
			res.send(docs);
		  });
		  if((await cursor.count()) === 0){
			console.log("No documnets found!");
		  }
		  await cursor.forEach(console.dir);
		} finally {
		  await client.close();
		}
	  }
	  run().catch(console.dir);
	 // res.send("OK");
});

http.createServer(app).listen(52273, function(){
	console.log("서버가 가동되었습니다.  http://127.0.0.1:52273");
});













