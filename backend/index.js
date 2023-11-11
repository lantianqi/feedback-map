require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const FormData = require("./models/ReactDataSchema");

app.use(express.json());
app.use(cors());

console.log(process.env.DB_COLLECTION);

const db_url = `${process.env.DB_URL}/${process.env.DB_COLLECTION}`;
// const db_url = "mongodb://localhost:27017/form_data";
mongoose.connect(db_url, { useNewUrlParser: true });

app.post("/insert", async (req, res) => {
  // const FirstName = req.body.firstName
  // const CompanyRole = req.body.companyRole
  const displayName = req.body.displayName;
  const message = req.body.message;
  const userLatitude = req.body.userLatitude;
  const userLongitude = req.body.userLongitude;

  const formData = new FormData({
    // name: FirstName,
    // role: CompanyRole,
    displayName: displayName,
    message: message,
    userLatitude: userLatitude,
    userLongitude: userLongitude,
  });

  try {
    await formData.save();
    res.send("inserted data..");
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
