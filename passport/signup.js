var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
module.exports = function(passport, dbs) {

  passport.use('signup', new LocalStrategy({
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }, function(req, username, password, done) {    
      dbs.production.collection('users').insertOne(req.body, function(err, res){
        if(err) console.log('err', err);
      });
  }));
}
