var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
  passport.use('login', new LocalStrategy({

    },
    function(req, username, password, done) {
      User.findOne({
          'username': username
        },
        function(err, user) {
          if (err)
            return done(err);
          if (!user) {
             console.log('user not found')
          }
        })
    }))
}
