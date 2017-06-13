var express = require('express');
var morgan = require('morgan')
var rfs = require('rotating-file-stream')
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var app = express();
var winston = require('winston');
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'application-logfile',
      filename: './log/application.json',
      level: 'silly'
    })
  ]
});
require('./dbs')(function(err, dbs){
    if(err){
      logger.log('error','Failed to make all database connections!, error-> %s',err);
      console.error(err);
      process.exit(1);
    }
    //Initialize the application once database connections are ready
    require('./routes')(app,dbs, logger).listen(5000, function(){
        logger.log('Node app is running on port', 5000);
    });
});


var logDirectory = path.join(__dirname, 'log')
//ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
//create a rotating write stream

var accessLogStream = rfs('access.log', {
  interval: '1d', //rotate daily
  path: logDirectory
});
//setup logger
app.use(morgan('combined', {stream: accessLogStream}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.set('bodyParser',bodyParser.json())
