var express = require('express');
var morgan = require('morgan')
var rfs = require('rotating-file-stream')
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var app = express();
var cars = require('./routes/cars');
var winston = require('winston');
var passport = require('passport');
var logger = new(winston.Logger)({
  transports: [
    new(winston.transports.File)({
      name: 'application-logfile',
      filename: './log/application.json',
      level: 'silly',
      prettyPrint: true
    }),
    new(winston.transports.Console)({
      level: process.env.LOG_LEVEL,
      prettyPrint: true,
      colorize: true,
      silent: false,
      timestamp: false
    })
  ]
});

require('./dbs')(function(err, dbs) {
  if (err) {
    logger.log('error', 'Failed to make all database connections!, error-> %s', err);
    console.error('error', err);
    process.exit(1);
  }
  //Initialize the application once database connections are ready
  require('./routes')(app, dbs, logger).listen(5000, function(err, req) {
    logger.log('info', 'Node app is running on port %s', 5000);
  });
});

app.use('/brands', cars);
var logDirectory = path.join(__dirname, 'log')
//ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
//create a rotating write stream

var accessLogStream = rfs('access.log', {
  interval: '1d', //rotate daily
  path: logDirectory
});
//setup logger
app.use(morgan('combined', {
  stream: accessLogStream
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))
// parse application/json
app.use(bodyParser.json())
app.set('bodyParser', bodyParser.json())
