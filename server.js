const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const passport = require('passport');

require('./db/mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./services/passport');

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(process.env.PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log('Up and running on port', process.env.PORT);
});
