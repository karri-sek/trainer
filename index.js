var express = require('express');
var app = express();
var initializeDatabases = require('./dbs');
var controllers = require('./controllers');

initializeDatabases(function(err, dbs){
    if(err){
      console.error('Failed to make all database connections!');
      console.error(err);
      process.exit(1);
    }
    //Initialize the application once database connections are ready
    controllers(app,dbs).listen(5000, function(){
        console.log('Node app is running on port', 5000);
    });
});
