var async = require('async');
var mongoClient = require('mongodb').MongoClient;

var PROD_URI = 'mongodb://sekhar:sekhar@ds151631.mlab.com:51631/trainer';

var databases = {
    production: async.apply(mongoClient.connect, PROD_URI)
}

module.exports = function(cb) {
  async.parallel(databases,cb);
}
