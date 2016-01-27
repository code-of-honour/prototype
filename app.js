var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var imageInline = require('stylus').url
var nodemailer = require('nodemailer')

// CSS
var stylus = require('stylus')
var nib = require('nib')

// New code
var mongo = require('mongodb')
var monk = require('monk')
var db = monk('localhost:27017/nodetest1')

var routes = require('./routes/index');
var users = require('./routes/users');

// instantiates express 
var app = express();
function compile(str, path) { // in order to use nib, pass in a custom compile fnc
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

// configure nodemailer

  // create reusable transporter
  var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

  // settings
  var mailOptions = {
    from: 'Admin, admin@server.com',
    to: '#',
    subject: 'Hello',
    text: 'Description',
  };

  

// view engine setup
app.set('views', path.join(__dirname, 'views')); // tells app where to find its views
app.set('view engine', 'jade'); // what engine to use 
// app.set('view engine', 'ejs'); // what engine to use 

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // log incoming requests to the console 
app.use(stylus.middleware(
    { src: __dirname + '/public',
    compile: compile // compile .styl files to CSS
    }
  ))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
// wrap db into every request = accessible to any new routes
app.use(function(req, res, next) {
  req.db = db
  next()
})

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
