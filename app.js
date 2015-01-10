var express = require('express'),
    passport = require('passport'),
    util = require('util');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var busboy = require('connect-busboy');

var routes = require('./routes/index'),
    users = require('./routes/users'),
    youtube = require('./routes/youtube'),
    loginRoute = require('./routes/login'),
    logoutRoute = require('./routes/logout'),
    accountRoute = require('./routes/account'),
    authRoute = require('./routes/auth');

var app = express();

var ConfigurePassport = require('./js/passport-config');

// Setup the passport
ConfigurePassport();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret : "AFunnySecret2",
    resave : false,
    saveUninitialized: true
}));
// Initialize the passport
app.use(passport.initialize());
app.use(passport.session());

// Initialize the busboy
app.use(busboy());

app.use('/', routes);
app.use('/users', users);
app.use('/youtube', youtube);
app.use('/account', accountRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/auth', authRoute);

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
