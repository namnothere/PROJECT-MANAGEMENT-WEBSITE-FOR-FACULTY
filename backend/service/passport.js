const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../configs/key');
console.log(keys.googleClientSecret)
const User = require("../models/user.model");
//const User = db.user;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
});

passport.use(
  new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({email: profile.emails[0].value});
      console.log(profile.emails[0].value)
      if (existingUser) {
        return done(null, existingUser);
      }
      

      // Create User test
      const user = await new User({
        username: profile.emails[0].value,     
        email: profile.emails[0].value,
        name: profile.name.familyName + ' ' + profile.name.givenName
      }).save();

      done(null, user);
    })
);
