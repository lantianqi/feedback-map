require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const express = require("express");
const { MongoClient } = require('mongodb');
const cors = require("cors");
const app = express();
const FormData = require("./models/FormData");

app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.DB_URL);

const myDB = client.db(process.env.DB_DB);
const myColl = myDB.collection(process.env.DB_COLLECTION);

// client.connect(process.env.DB_URL);
client.connect("mongodb+srv://feedback-map-admin:1cCzFj7UWRFAr4VV@feedback-map-cluster.lvynzsc.mongodb.net/?retryWrites=true&w=majority");

app.post("/insert", async (req, res) => {
  const displayName = req.body.displayName;
  const message = req.body.message;
  const userLatitude = req.body.userLatitude;
  const userLongitude = req.body.userLongitude;

  const formData = new FormData(
    displayName,
    message,
    userLatitude,
    userLongitude,
  )
  const doc = formData;

  try {
    const result = await myColl.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.send("inserted data..");
  } catch (err) {
    console.log(err);
  };
})

app.get('/', async (req, res) => {
  res.status(200).json({
    "msg": 'Hello World!',
    "env": process.env.NODE_ENV,
    "db_url": process.env.DB_URL
  })
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;