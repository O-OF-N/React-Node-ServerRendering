var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise
import { ActiveEnv, DBConfig } from './config/app-config';
import * as ErrorHandle from './error-handler';

const getDBURL = () => {
  let userName, password, url, schema;
  ({ userName, password, url, schema } = DBConfig.get(ActiveEnv));
  const dbConn = `mongodb://${userName}:${password}@${url}/${schema}`;
  return dbConn;
};
//database
mongoose.connect(getDBURL());
var db = mongoose.connection;
db.on('error', (err) => { console.log(`Error connecting to db ${err}`); });
db.once('open', () => { console.log('connected to Mongo DB'); });

// controller imports
import ViewRendererController from './controllers/view-renderer-controller';
import ObservationController from './controllers/observation-controller';
import MedicationController from './controllers/medication-controller';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../../public')));

app.use('/', ViewRendererController);
app.use('/observation', ObservationController);
app.use('/medication', MedicationController);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers


if (app.get('env') === 'development') {
  app.use(ErrorHandle.DevErrorHandle);
} else {
  app.use(ErrorHandle.ProdErrorHandle);
}

module.exports = app;
