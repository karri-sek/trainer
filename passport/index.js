var login = require('./login');
var signup = require('./signup');
var User = require('../models/user');

module.exports = function(app, passport, dbs, logger) {
  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser(function(user, done) {
    console.log('serializing user: ');
    console.log(user);
    done(null, {
      id: user.userid
    });
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log('deserializing user:', user);
      done(err, user);
    });
  });

  // Setting up Passport Strategies for Login and SignUp/Registration
  login(passport, dbs, logger);
  signup(passport, dbs, logger);
  return app;
}
