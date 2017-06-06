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
    dbs.production.collection('users').find({}).toArray(function(err, users) {
      if (err) {
        console.log(err);
        res.error(err);
      } else {
        res.json(users);
      }
    });
  });

  app.get('/users/:id', function(req, res) {
    dbs.production.collection('users').findOne({
        _id: parseInt(req.params.id)
      },
      function(err, result) {
        if (err) {
          console.log(err);
          res.error(err);
        } else {
          console.log(result);
          res.send(result);
        }
      });
  });

  app.post('/addusers', function(req, res) {
    if (req.body._id == undefined || req.body._id == null || req.body._id == 0) {
      dbs.production.collection('users').find({}).sort({
        "_id": -1
      }).limit(1).toArray(function(err, users) {
        if (users.length != 0) req.body._id = users[0]._id + 1
        else req.body._id = 1
        dbs.production.collection('users').insertOne(req.body,
          function(err, result) {
            if (err) {
              console.log(err);
              res.error(err);
            } else {
              res.json(result);
            }
          });
      });
    }
  });
  return app;
}
