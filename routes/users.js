const express = require('express');
const User = require('../models/User');
const gravatar = require('gravatar');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const router = express.Router();

//Register User
router.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).send(errors);
  }

  const { email, name, password } = req.body;
  const checkUser = await User.findOne({ email });
  // console.log(checkconst checkUser);
  if (checkUser) {
    return res.status(400).json({ email: 'Email already exists' });
  }
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm', //---Default
  });
  try {
    const user = new User({ name, email, avatar, password });
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, ...token });
  } catch (error) {
    res.status(400).send(errors);
  }
});

//Login User
router.post('/login', async (req, res) => {
  // const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).send(errors);
  }
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, ...token });
  } catch (error) {
    errors.email = 'Unable to login';
    errors.password = 'Unable to login';
    res.status(400).send(errors);
  }
});

//Get Current User
router.get(
  '/current_user',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    try {
      res.send(req.user);
    } catch (error) {
      res.status(500).send();
    }
  }
);

module.exports = router;
