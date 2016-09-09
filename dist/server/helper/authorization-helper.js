"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authorize = undefined;

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _constants = require('../util/constants');

var Constants = _interopRequireWildcard(_constants);

var _fhirResourceService = require('../service/fhir-resource-service');

var ServerCall = _interopRequireWildcard(_fhirResourceService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authorize = exports.authorize = function authorize(iss, launch) {
    return (0, _co2.default)(authorizeURL.bind(undefined, iss, launch)).catch(console.log);
};

var authorizeURL = regeneratorRuntime.mark(function authorizeURL(iss, launch) {
    var issURl, result, authorizeURL, redirectUrl;
    return regeneratorRuntime.wrap(function authorizeURL$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    issURl = decodeURIComponent(iss) + '/metadata';
                    _context.next = 3;
                    return ServerCall.callUrl(issURl);

                case 3:
                    result = _context.sent;
                    authorizeURL = result.data.rest[0].security.extension[0].extension.filter(function (ext) {
                        return ext.url === 'authorize';
                    })[0].valueUri;
                    redirectUrl = authorizeURL + '?response_type=' + Constants.RESPONSE_TYPE + '&client_id=' + Constants.CLIENT_ID + '&redirect_uri=' + Constants.REDIRECT_URL + '&launch=' + launch + '&scope=' + Constants.SCOPE + '&state=98wrghuwuogerg97&aud=' + iss;

                    console.log('>>>>>>>>>');
                    console.log(redirectUrl);
                    return _context.abrupt('return', redirectUrl);

                case 9:
                case 'end':
                    return _context.stop();
            }
        }
    }, authorizeURL, this);
});
//# sourceMappingURL=authorization-helper.js.map