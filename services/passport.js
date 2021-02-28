const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const existingUser = await User.findById(jwt_payload._id);
      if (existingUser) {
        done(null, existingUser);
      } else {
        done(null, false);
      }
    } catch (error) {
      res.status(500).send();
    }
  })
);
