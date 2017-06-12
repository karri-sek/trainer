var express = require('express')
  , router  = express.Router();

//cars brand page

router.get('/brands', function(req, res){
    let db = req.app.get('db');
    res.send('called /cars/brands');
  

});

module.exports = router
