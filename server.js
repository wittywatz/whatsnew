const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

require('./db/mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(process.env.PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log('Up and running on port', process.env.PORT);
});
