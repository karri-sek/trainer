  var LocalStrategy = require('passport-local').Strategy;
  var User = require('../models/user');
  var bCrypt = require('bcrypt-nodejs');
  module.exports = function(passport, dbs, logger) {

    passport.use('signup', new LocalStrategy({
      passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function(req, username, password, done) {
      dbs.production.collection('users').findOne({
        username: username
      }, function(err, doc) {
        if (err) console.log('Error on finding the user with user name ', username);
        if (doc) {
          logger.log('error', 'user already exists with user name %s', username)
        } else {
          dbs.production.collection('users').find({}).sort({
            "_id": -1
          }).limit(1).toArray(function(err, users) {
            if (users.length != 0) req.body._id = users[0]._id + 1
            else req.body._id = 1;
            req.body.password = createHash(password);
            dbs.production.collection('users').insertOne(req.body,
              function(err, result) {
                if (err) {
                  logger.log('error', 'Unable to create user with username: %s', username)
                  res.error(err);
                } else {
                  logger.log('info', 'user %s created successfully.', username)
                  done(null,result.ops[0]);
                }
              });
          });
        }
      });
    }));

    var createHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
  }
