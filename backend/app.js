const express = require('express');

const app = express();

app.use('/api', (req, res) => {
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
