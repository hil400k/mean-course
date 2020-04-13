const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api", (req, res, next) => {
  const post = req.body;
  console.info(post, 'post');
  res.status(201).json({
    message: "Post added succesfully"
  });
})

app.get('/api', (req, res) => {
  const posts = [
    { id: 1, title: 'server-side post', content: 'content' },
    { id: 2, title: 'server-side post2', content: 'content2' },
  ];

  res.status(200).json({
    message: 'all good',
    posts
  });
});

module.exports = app;
