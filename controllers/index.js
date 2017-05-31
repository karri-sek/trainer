var async = require('async');

module.exports = function(app, dbs){
  app.get('/production', function(req, res){
      dbs.production.collection('test').find({}).toArray(function(err, docs){
        if(err){
          console.log(err);
          res.error(err);
        }else{
          res.json(docs);
        }
      });
  });

  app.get('/users', function(req,res){
    dbs.production.collection('users').insert({_id:1,name:'sekhar'});
  });

  return app;
}
