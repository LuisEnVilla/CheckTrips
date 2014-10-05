require('./models');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./controllers/index');
var insert = require('./controllers/insert');
var log = require('./controllers/logeo');
var top = require('./controllers/top');
var profile = require('./controllers/profile');
var compare = require('./controllers/compare');
var Funcionarios = require('./controllers/funcionarios');
var seguir = require('./controllers/agregarSeguir');
var aclaracion = require('./controllers/aclaraciones');
var api = require('./controllers/api');
var alta = require('./controllers/altaviaje');
var search = require('./controllers/search');
var app = express();
// Configuration

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Controllers
app.use('/', index);
app.use('/log',log);
app.use('/top', top);
app.use('/profile', profile);
app.use('/funcionario',Funcionarios);
app.use('/compare', compare);
app.use('/insert', insert);
app.use('/seguir',seguir);
app.use('/aclarar',aclaracion);
app.use('/api',api);
app.use('/alta',alta);
app.use('/search', search);

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