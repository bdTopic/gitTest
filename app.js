/**
 * @file express main router
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var log4js = require('log4js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');

var routes = require('./routes');

var app = express();

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(favicon(__dirname + '/public/favicon.ico'));
swig.setDefaults({
    cache: false
});

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname + '/public'));

// 单页面应用
app.use(express.static(__dirname + '/spa'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('404', {
            message: err.stack,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.error();
    res.status(err.status || 500);
    res.render('404', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
