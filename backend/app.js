require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const express = require("express");
const app = express();
const PORT = 4000;

const cors = require("cors");
app.use(express.json());
app.use(cors());

const { MongoClient } = require("mongodb");
// const mongoClient = new MongoClient(process.env.DB_URL);
// const myDB = mongoClient.db(process.env.DB_DB);
// const myColl = myDB.collection(process.env.DB_COLLECTION);
// mongoClient.connect(process.env.DB_URL);
const mongoClient = new MongoClient("mongodb+srv://feedback-map-admin:1cCzFj7UWRFAr4VV@feedback-map-cluster.lvynzsc.mongodb.net/?retryWrites=true&w=majority");
const myDB = mongoClient.db("feedback-map-db");
const myColl = myDB.collection("feedback-map-collection");
mongoClient.connect("mongodb+srv://feedback-map-admin:1cCzFj7UWRFAr4VV@feedback-map-cluster.lvynzsc.mongodb.net/?retryWrites=true&w=majority");

try {
  console.log(process.env.NODE_ENV);
  console.log(process.env.DB_URL);
  console.log(process.env.DB_DB);
  console.log(process.env.DB_COLLECTION);
  const doc = { name: "NAME" };
  const result = await myColl.insertOne(doc);
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
  res.send("inserted data..");
} catch (err) {
  console.log(err);
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About route 🎉 ");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
