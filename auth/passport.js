const bcrypt = require('bcrypt');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const {models} = require('../models');
//const authService = require('./authService');

// const users = require('../models/users')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async function(username, password, done) {
    try{
      const user = await models.clients.findOne({
        where:
           { 
             EMAIL: username,
             ISLOCK: false,
             ISDELETED: false
           },
        raw:true
      });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const match = await validPassword(user, password);
      if (!match) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    }
    catch (err){
      return done(err);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null,user);
});

passport.deserializeUser(function(user, done) {
  return done(null, user);
});


function validPassword(user, password)
{
    return bcrypt.compare(password, user.PASS);
}


module.exports = passport;