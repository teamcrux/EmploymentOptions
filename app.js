const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const passport = require('passport');
require('./server/config/passport')(passport);

const routes = require('./server/router/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({
  secret: 'allYOURbaseAREbelongTOus',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Create Super User
require('./server/config/superuser');

// Login
app.post('/login', passport.authenticate('local-login'), (req, res, next)=>{
  const token = jwt.sign({
    username: req.user.username
  }, 'allYOURbaseAREbelongTOus', {
      algorithm: 'HS256',
      expiresIn: '1 d'
  });
  console.log(token);
  res.json({
      success: true,
      message: 'access granted',
      token: token
  });
});

// Require our router into the application.
app.use('/api', passport.authenticate('jwt', {session: false}) ,routes);
//app.use('/api', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
