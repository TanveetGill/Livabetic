var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var multer = require('multer')

// Routes may be different for users (ie, when use is signed in vs when they are not)
var routes = require('./routes');
var users = require('./routes/users');

var app = module.exports = express();

//var configDB = require('./models/database') - What happens if we dont add this in here????????? is it like doing node database.js to sync it????
// also what do some fo the configurations do at the bottom?????????????????????????????????????????
//THE PASSPORT CONFIGURATION SHOULD GO HERE AS SO:
require('./config/passport')(passport)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport setup for user sessions
app.use(session({
    secret: 'settingUpUserLoginInformation',
    resave: true,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session()); //helps make presistant login sessions
app.use(flash()); //allows us to use connect-flash for flash messages that are stored in sessions

app.use('/', routes);
app.use('/users', users);

// app.use(express.static(__dirname, 'public/build'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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

// console.log('----- APP', JSON.stringify(app))