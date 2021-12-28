const bcrypt = require('bcrypt');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const {models} = require('../models');
//const authService = require('./authService');

// const Clients = require('../models/clients')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async function(username, password, done) {
    try{
      const client = await models.clients.findOne(
        {where: { EMAIL: username },
        raw:true
      });
      if (!client) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const match = await validPassword(client, password);
      if (!match) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, client);
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


function validPassword(client, password)
{
    return bcrypt.compare(password, client.PASS);
}


module.exports = passport;