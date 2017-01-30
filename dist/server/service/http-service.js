"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = exports.post = exports.get = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _constants = require('../util/constants');

var Constants = _interopRequireWildcard(_constants);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get = exports.get = function get(url) {
  var header = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  return header ? _axios2.default.get(url, header.toJS()) : _axios2.default.get(url);
};

var post = exports.post = function post(url, body, header) {
  return _axios2.default.post(url, _querystring2.default.stringify(body.toJS()), header.toJS());
};

var all = exports.all = function all(functions) {
  return _axios2.default.all(functions.map(function (fn) {
    return fn();
  }));
};
//# sourceMappingURL=http-service.js.map