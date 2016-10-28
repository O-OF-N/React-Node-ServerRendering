'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildMedicationURL = exports.buildObeservationURL = exports.checkResponseStatus = exports.buildAuthorizationHeader = undefined;

var _constants = require('./constants');

var Constants = _interopRequireWildcard(_constants);

var _models = require('../models/models');

var Records = _interopRequireWildcard(_models);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var buildAuthorizationHeader = exports.buildAuthorizationHeader = function buildAuthorizationHeader(userModel) {
    var Authorization = 'Bearer ' + userModel.accessToken;
    return new Records.AuthorizationHeader({ headers: { Accept: "application/json+fhir", Authorization: Authorization } });
};

var checkResponseStatus = exports.checkResponseStatus = function checkResponseStatus(json) {
    return json && json.status && json.status === Constants.HTTP_SUCCESS ? true : false;
};

var buildObeservationURL = exports.buildObeservationURL = function buildObeservationURL(patient, lonicCodes, url, dates) {
    var codes = lonicCodes.map(function (l) {
        return Constants.LONIC_URL.concat(Constants.LONIC_CODES.get(l));
    }).join(',');
    var urlConstructed = '';
    if (dates != null && dates instanceof Array && dates.length == 2) {
        var dateRange = ''.concat('date=gt').concat(dates[0]).concat('&date=lt').concat(dates[1]);
        urlConstructed = url + '/' + Constants.OBSERVATIONS + '?patient=' + 4478007 + '&code=' + codes + '&' + dateRange;
    } else urlConstructed = url + '/' + Constants.OBSERVATIONS + '?patient=' + 4478007 + '&code=' + codes;
    return urlConstructed;
};

var buildMedicationURL = exports.buildMedicationURL = function buildMedicationURL(patient, url) {
    return url + '/' + Constants.MEDICATION_ORDER + '?patient=' + 4478007;
};
//# sourceMappingURL=http-utils.js.map