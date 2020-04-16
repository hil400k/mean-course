const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require("./routes/posts");

const app = express();
// TiMEkZFxewDTfde4

mongoose.connect("mongodb+srv://dmytro:TiMEkZFxewDTfde4@cluster0-2p8lv.mongodb.net/node-angular?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.info("Connected to DB");
  })
  .catch(() => {
    console.info("Connection failed");
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});


app.use("/api", postRoutes);

module.exports = app;
