'use strict';

var _appConfig = require('./config/app-config');

var _viewRendererController = require('./controllers/view-renderer-controller');

var _viewRendererController2 = _interopRequireDefault(_viewRendererController);

var _glucoseResultsController = require('./controllers/glucose-results-controller');

var _glucoseResultsController2 = _interopRequireDefault(_glucoseResultsController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


var getDBURL = function getDBURL() {
  var userName = void 0,
      password = void 0,
      url = void 0,
      schema = void 0;

  var _DBConfig$get = _appConfig.DBConfig.get(_appConfig.ActiveEnv);

  userName = _DBConfig$get.userName;
  password = _DBConfig$get.password;
  url = _DBConfig$get.url;
  schema = _DBConfig$get.schema;

  var dbConn = 'mongodb://' + userName + ':' + password + '@' + url + '/' + schema;
  return dbConn;
};
//database
mongoose.connect(getDBURL());
var db = mongoose.connection;
db.on('error', function (err) {
  console.log('Error connecting to db ' + err);
});
db.once('open', function () {
  console.log('connected to Mongo DB');
});

// controller imports


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../../public')));

app.use('/', _viewRendererController2.default);
app.use('/results', _glucoseResultsController2.default);

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
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
//# sourceMappingURL=app.js.map