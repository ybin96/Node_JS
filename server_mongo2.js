var http = require("http")
var express = require("express")
var app = express();
app.use(express.static("public"));
app.use(express.bodyParser());
app.use(app.router);

const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;
// const assert = require('assert');
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'mydb';

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/insertDept", function(req,res){
	var dept = req.body;		
  const doc = { dno:dept.dno,dname:dept.dname,dloc:dept.dloc };
  async function run() {
    try {
      await client.connect();
      const database = client.db("mydb");
      const movies = database.collection("dept");      
      const result = await movies.insertOne(doc);
      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
      );
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
  res.send("OK");
});


app.post("/updateDept", function(req,res){
	var dept = req.body;		
  
  async function run() {
    try {
      await client.connect();
      const database = client.db("mydb");
      const movies = database.collection("dept");     

      const filter = {dno:dept.dno};
      const options = { upsert: true };   
      const updateDoc = {$set:{dname:dept.dname,dloc:dept.dloc }};

      const result = await movies.updateOne(filter, updateDoc, options );
      console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      );
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
  res.send("OK");
});




app.get("/listDept", function(req,res){
  const client = new MongoClient(url);
  client.connect(function(err, client) {
  //  assert.equal(null, err);
   const db = client.db(dbName);
   const col = db.collection('dept');
       col.find({}).toArray(function(err, docs) {
       client.close();
       res.send(docs);
     });
  });
});

http.createServer(app).listen(52273, function(){
  console.log("서버 가동됨");
});
