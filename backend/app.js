const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added succesfully",
      postId: createdPost._id
    });
  });
})

app.get("/api", (req, res) => {
  Post.find()
    .then((documents) => {
      res.status(200).json({
        message: 'all good',
        posts: documents
      });
    })
});

app.del("/api/:id", (req, res, next) => {
  console.info(req.params.id);
  Post.deleteOne({
    _id: req.params.id
  }).then((result) => {
    console.info(result);
    res.status(200).json({
      message: "Post deleted"
    });
  });
});

module.exports = app;
