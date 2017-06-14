  var LocalStrategy = require('passport-local').Strategy;
  var User = require('../models/user');
  var bCrypt = require('bcrypt-nodejs');
  var async = require('async');
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
          getUser(req, password).
          then(user => insertUserRecord(user, done)).
          catch(err => console.log('err', err));
        }
      });
    }));

    var createHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

    var getUser = (req, password) =>
      new Promise((resolve, reject) => {
        dbs.production.collection('users').find({}).sort({
          "userid": -1
        }).limit(1).toArray((err, users) => {
          if (err) reject(err)
          else {
            var user = new User(req.body);
            user.password = createHash(password);
            user.userid = (users.length != 0 ? users[0].userid + 1: 1);
            resolve(user);
          }
        });
      });

    var insertUserRecord = (user, done) =>
      dbs.production.collection('users').insertOne(user, (err, result) => {
        if (err) {
          logger.log('error', 'Unable to create user with username: %s', user.username)
          res.error(err);
        } else {
          logger.log('info', 'user %s created successfully.', user.username)
          return done(null,user)
        }
      });
  }
