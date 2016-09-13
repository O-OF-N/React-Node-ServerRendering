'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ActiveEnv = exports.FHIRConfig = exports.DBConfig = undefined;

var _immutable = require('immutable');

var devDatabase = {
    userName: 'bear',
    password: 'bear4kids',
    url: 'ds029496.mlab.com:29496',
    schema: 'diabetesdashboard'
};

var devFhirAuth = {
    client_id: '707ffe10-83ee-42f2-b2e8-1871ad0c1a4c',
    redirect_uri: 'https://diabetesdashboard.herokuapp.com/callback',
    scope: 'launch+user%2FObservation.read',
    response_type: 'code',
    grant_type: 'authorization_code'
};

var DBConfig = exports.DBConfig = new _immutable.OrderedMap({
    development: devDatabase
});

var FHIRConfig = exports.FHIRConfig = new _immutable.OrderedMap({
    development: devFhirAuth
});

var env = {
    dev: "development"
};

var ActiveEnv = exports.ActiveEnv = env.dev;
//# sourceMappingURL=app-config.js.map