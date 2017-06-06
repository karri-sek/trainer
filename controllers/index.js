var async = require('async');

module.exports = function(app, dbs) {
  app.get('/production', function(req, res) {
    dbs.production.collection('test').find({}).toArray(function(err, docs) {
      if (err) {
        console.log(err);
        res.error(err);
      } else {
        res.json(docs);
      }
    });
  });

  app.get('/users', function(req, res) {
    dbs.production.collection('users').find({}).toArray(function(err, result) {
        if (err) {
          console.log(err);
          res.error(err);
        } else {
          console.log(result);
          res.json(result);
        }
      });
  });


    app.get('/users/:id', function(req, res) {
      console.log(req.params.id);
      dbs.production.collection('users').findOne({_id: req.params.id}, function(err, result){
        if(err) return next(err);
        console.log(result);
        res.send(result);
      });
    });

  app.get('/addusers', function(req, res) {
    dbs.production.collection('users').insertOne({
        _id: 3,
        name: 'tejaswi'
      },
      function(err, result) {
        if (err) {
          console.log(err);
          res.error(err);
        } else {
          res.json(result);
        }
      });
  });

  app.get('/listusers', function(req, res) {
    console.log('hiii');
    dbs.production.collection('users').find({},  function(err, docs) {
        if (err) {
          console.log(err);
          res.error(err);
        } else {
          docs.forEach(function(doc, index) {
            console.log(doc._id + " key: "+ doc.name);
          });
        }
      });
  });

  return app;
}
