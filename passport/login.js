var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, dbs, logger) {
  passport.use('login', new LocalStrategy({
    passReqToCallback: true
  }, function(req, username, password, done) {
    dbs.production.collection('users').findOne({
      username: username
    }, function(err, user) {
      if (err) console.log('Error on finding the user with user name ', username);
      else {
        // User exists but wrong password, log the error
        if (!isValidPassword(user, password)) {
          console.log('Invalid Password');
          return done(null,  user); // redirect back to login page
        } else {
          return done(null, user);
        }
      }
    });
  }));
  var isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
  }
}
