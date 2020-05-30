const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const models = require('../models');

const dotenv = require('dotenv');
dotenv.config(); // LOAD CONFIG


///////////////////////////////////////////////////////////////////////////

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new FacebookStrategy({
  // https://developers.facebook.com에서 appId 및 scretID 발급
  clientID: process.env.FACEBOOK_APPID, //입력하세요
  clientSecret: process.env.FACEBOOK_SECRETCODE, //입력하세요.
  callbackURL: `${process.env.SITE_DOMAIN}/auth/facebook/callback`,
  profileFields: ['id', 'displayName', 'photos', 'email'] //받고 싶은 필드 나열
},
  async (accessToken, refreshToken, profile, done) => {

    try {
      console.log(profile);


    } catch (e) {
      console.log(e);
    }

  }
));
///////////////////////////////////////////////////////////////////////////

module.exports = passport;