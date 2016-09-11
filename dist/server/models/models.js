'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.POSTHeader = exports.AuthorizationHeader = exports.AccessTokenBody = exports.Observation = undefined;

var _immutable = require('immutable');

var _constants = require('../util/constants');

var Constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Observation = exports.Observation = new _immutable.Record({
    date: '',
    quantity: 0,
    interpretation: ''
});

var AccessTokenBody = exports.AccessTokenBody = new _immutable.Record({
    grant_type: Constants.GRANT_TYPE,
    code: '',
    redirect_uri: Constants.REDIRECT_URL,
    client_id: Constants.CLIENT_ID
});

var AuthorizationHeader = exports.AuthorizationHeader = new _immutable.Record({
    headers: Constants.AUTHORIZATION_HEADER
});

var POSTHeader = exports.POSTHeader = new _immutable.Record({
    "content-type": "x-www-form-urlencoded"
});
//# sourceMappingURL=models.js.map