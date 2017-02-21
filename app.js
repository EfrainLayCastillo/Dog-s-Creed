var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//Engine of Handlebars
var hbs = require('express-handlebars');
//Data Base *MongoDB*
var mongoose = require('mongoose');
//Session middleware
var session = require('express-session');
var passport =require('passport');
//__Method
var methodOverride = require('method-override');

var flash = require('connect-flash');
var validator = require('express-validator');
//Custom middleware
//var session_middleware = require('./middleware/session');
//routes
var index = require('./routes/index');
var users = require('./routes/users');
var user_Admin = require('./routes/user_Admin');

var app = express();
//Mongoose Connection
mongoose.connect('mongodb://localhost/test');
require('./config/passport');

//Engine of Handlebars
app.engine('.hbs', hbs({
  extname:'.hbs',
  defaultLayout:'main',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
  })
);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(validator());
app.use(cookieParser());
//middleware Session use
app.use(session({secret: 'the kitty is dead', resave: 'false', saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//less middleware
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
//middleware all request
app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  next();
});
//routes using
app.use('/', index);
app.use('/users', users);
//app.use('/admin', session_middleware);
app.use('/admin', user_Admin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
