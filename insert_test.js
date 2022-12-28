const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri)

async function run() {
  try {
    await client.connect();

    const database = client.db("mydb");
    const dept = database.collection("dept");
    // create a document to be inserted
    const doc = { dno:30,dname:"인사팀",dloc:"판교" };
    const result = await dept.insertOne(doc);

    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
