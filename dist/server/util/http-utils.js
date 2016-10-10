'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildObeservationURL = exports.buildAuthorizationHeader = undefined;

var _constants = require('./constants');

var Constants = _interopRequireWildcard(_constants);

var _models = require('../models/models');

var Records = _interopRequireWildcard(_models);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var buildAuthorizationHeader = exports.buildAuthorizationHeader = function buildAuthorizationHeader(userModel) {
    var Authorization = 'Bearer ' + userModel.accessToken;
    return new Records.AuthorizationHeader({ headers: { Accept: "application/json+fhir", Authorization: Authorization } });
};

var buildObeservationURL = exports.buildObeservationURL = function buildObeservationURL(patient, lonicCodes, url) {
    var codes = lonicCodes.map(function (l) {
        return Constants.LONIC_URL.concat(Constants.LONIC_CODES.get(l));
    }).join(',');
    return url + '/' + Constants.OBSERVATIONS + '?patient=' + patient + '&code=' + codes;
};
//# sourceMappingURL=http-utils.js.map