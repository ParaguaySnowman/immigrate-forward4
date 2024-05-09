const passport = require('passport');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model.js'); // Assuming you have a User model set up with Mongoose

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  async function (accessToken, refreshToken, profile, cb) {
    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        // Create a new user with Google profile data
        user = new User({
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          isRegistrationComplete: false,
          // You can extract other fields from the Google profile here
        });

        // Save the new user
        await user.save();
      }

      cb(null, user);
    } catch (err) {
      cb(err, null);
    }
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id); // or user._id if you're using MongoDB's ObjectID
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;