'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FHIRAuthorizationConfig = exports.DatabaseConfig = exports.UserAuthentication = exports.POSTHeader = exports.AuthorizationHeader = exports.AccessTokenRequestBody = exports.AccessToken = exports.Observation = undefined;

var _immutable = require('immutable');

var _constants = require('../util/constants');

var Constants = _interopRequireWildcard(_constants);

var _appConfig = require('../config/app-config');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

console.log('active>>>>>>>> ' + _appConfig.ActiveEnv);
console.log(_appConfig.FHIRConfig.get(_appConfig.ActiveEnv));

var Observation = exports.Observation = new _immutable.Record({
    date: '',
    quantity: 0,
    interpretation: ''
});

var AccessToken = exports.AccessToken = new _immutable.Record({
    patient: 0,
    accessToken: ''
});

var AccessTokenRequestBody = exports.AccessTokenRequestBody = new _immutable.Record({
    grant_type: _appConfig.FHIRConfig.get(_appConfig.ActiveEnv).grantType,
    code: '',
    redirect_uri: _appConfig.FHIRConfig.get(_appConfig.ActiveEnv).redirectUrl,
    client_id: _appConfig.FHIRConfig.get(_appConfig.ActiveEnv).clientId
});

var AuthorizationHeader = exports.AuthorizationHeader = new _immutable.Record({
    headers: Constants.AUTHORIZATION_HEADER
});

var POSTHeader = exports.POSTHeader = new _immutable.Record({
    "Content-Type": "x-www-form-urlencoded"
});

var UserAuthentication = exports.UserAuthentication = new _immutable.Record({
    state: '',
    iss: '',
    authorizationCode: '',
    accessToken: '',
    authorizationURL: '',
    tokenURL: '',
    patient: 0
});

var DatabaseConfig = exports.DatabaseConfig = new _immutable.Record({
    userName: '',
    password: '',
    url: '',
    schema: ''
});

var FHIRAuthorizationConfig = exports.FHIRAuthorizationConfig = new _immutable.Record({
    clientId: '',
    redirectUrl: '',
    responseType: 'code',
    scope: ''
});
//# sourceMappingURL=models.js.map