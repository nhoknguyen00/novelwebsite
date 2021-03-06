var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

var mongoose = require('mongoose');
// connect mongoose
var mongoDB = 'mongodb+srv://nhoknguyen00:1472125514@cluster0-gntax.mongodb.net/mikeweb';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./config/passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');

var app = express();

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/', partialsDir:[
    //  path to your partials
    path.join(__dirname, 'views/partials/')
  ]}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'mysupersecret',
  resave: false,
  saveUninitialized: false,
}));

//connect flash
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
  res.locals.success_msg=req.flash('success_msg');
  res.locals.error_msg=req.flash('error_msg');
  res.locals.error=req.flash('error');
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', catalogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
