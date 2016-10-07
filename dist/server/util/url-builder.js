'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildObeservationURL = undefined;

var _constants = require('./constants');

var Constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var buildObeservationURL = exports.buildObeservationURL = function buildObeservationURL(patient, lonicCodes, url) {
    var codes = lonicCodes.map(function (l) {
        return Constants.LONIC_URL.concat(Constants.LONIC_CODES.get(l));
    }).join('/');
    return url + '/' + Constants.OBSERVATIONS + '?patient=' + patient + '&code=' + codes;
};
//# sourceMappingURL=url-builder.js.map