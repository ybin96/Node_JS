var http = require("http");
var express = require("express");
var app = express();

app.use(express.static("public"));
app.use(express.bodyParser());
app.use(app.router);

const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri,{
	useNewUrlParser:true,
	useUnifiedTopology:true,
});

const dbName = "mydb";
const colName = "dept";

app.all("/dept/list",function(req, res){
	async function run() {
		try {
		  await client.connect();
		  const database = client.db(dbName);
		  const dept = database.collection(colName);
		  const query = { 
			// runtime: { $lt: 15 } 
		};
    	  const options = {
		//   sort: { title: 1 },
		//   projection: { _id: 0, title: 1, imdb: 1 },
		  };
		  
		  const cursor = dept.find(query,options);

		  cursor.toArray(function(err,docs){
			res.send(docs);
		  })
		  
		  if ((await cursor.count()) === 0) {
			console.log("No documents found!");
		  }
		   
		  await cursor.forEach(console.dir);

		} finally {
		  await client.close();
		}
	  }
	  run().catch(console.dir);
});

http.createServer(app).listen(52273, function(){
	console.log("Server Running at http://127.0.0.1:52273");
});