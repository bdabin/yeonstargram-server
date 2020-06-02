const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passwordHash = require('../helpers/passwordHash');
const models = require('../models');

passport.serializeUser((user, done) => {
    console.log('serializeUser');
    done(null, user.id);
});

passport.deserializeUser((user, done) => {
    console.log('deserializeUser');
    models.User.findOne({where:{id:user}})
      .then(result => done(null, result))
});


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false
},
    ( email, password, done) => {
      models.User.findOne({where:{email}})
        .then(data => {
          if(data) {
            // 비밀번호가 일치하지 않을 때
            if(data.dataValues.password !== passwordHash(password)) {
              return done(null, false)
            } else {
              return done(null, data.dataValues)
            }
          } else {
            return done(null,false)
          }
        })
        .catch(err => {
          res.status(405).send(err)
        })
    }
));

module.exports = passport;