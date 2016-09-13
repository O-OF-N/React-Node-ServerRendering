"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.accessToken = exports.authorize = undefined;

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _constants = require('../util/constants');

var Constants = _interopRequireWildcard(_constants);

var _httpService = require('../service/http-service');

var httpService = _interopRequireWildcard(_httpService);

var _models = require('../models/models');

var Records = _interopRequireWildcard(_models);

var _UserAuthenticationSchema = require('../models/UserAuthenticationSchema');

var _UserAuthenticationSchema2 = _interopRequireDefault(_UserAuthenticationSchema);

var _appConfig = require('../config/app-config');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authorize = exports.authorize = function authorize(iss, launch) {
    return (0, _co2.default)(getaAuthorizeURL.bind(undefined, iss, launch)).catch(console.log);
};

var accessToken = exports.accessToken = function accessToken(code, state) {
    return (0, _co2.default)(getAccessToken.bind(undefined, code, state)).catch(console.log);
};

var getAccessToken = regeneratorRuntime.mark(function getAccessToken(code, state) {
    var userAuthenticationModel, requestBody, result;
    return regeneratorRuntime.wrap(function getAccessToken$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:

                    console.log('here>>>>>>>>>>');
                    _context.next = 3;
                    return _UserAuthenticationSchema2.default.findByState(state);

                case 3:
                    userAuthenticationModel = _context.sent;

                    console.log(userAuthenticationModel);
                    requestBody = new Records.AccessTokenRequestBody({ code: code });
                    _context.next = 8;
                    return httpService.post(Constants.TOKEN_URL, requestBody, new Records.POSTHeader());

                case 8:
                    result = _context.sent;
                    return _context.abrupt('return', new Records.AccessToken({ patient: result.data.patient, accessToken: result.data.access_token }));

                case 10:
                case 'end':
                    return _context.stop();
            }
        }
    }, getAccessToken, this);
});

var getaAuthorizeURL = regeneratorRuntime.mark(function getaAuthorizeURL(iss, launch) {
    var state, issURl, result, authorizationURL, tokenURL, authModel, redirectUrl;
    return regeneratorRuntime.wrap(function getaAuthorizeURL$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    state = buildState(launch);
                    issURl = decodeURIComponent(iss) + '/metadata';
                    _context2.next = 4;
                    return httpService.get(issURl, new Records.AuthorizationHeader());

                case 4:
                    result = _context2.sent;
                    authorizationURL = result.data.rest[0].security.extension[0].extension.filter(function (ext) {
                        return ext.url === 'authorize';
                    })[0].valueUri;
                    tokenURL = result.data.rest[0].security.extension[0].extension.filter(function (ext) {
                        return ext.url === 'token';
                    })[0].valueUri;
                    authModel = new Records.UserAuthentication({
                        iss: iss, state: state, authorizationURL: authorizationURL, tokenURL: tokenURL
                    });
                    _context2.next = 10;
                    return _UserAuthenticationSchema2.default.save(authModel);

                case 10:
                    redirectUrl = authorizationURL + '?response_type=' + _appConfig.FHIRConfig.get(_appConfig.ActiveEnv).responseType + '&client_id=' + _appConfig.FHIRConfig.get(_appConfig.ActiveEnv).clientId + '&redirect_uri=' + _appConfig.FHIRConfig.get(_appConfig.ActiveEnv).redirectUrl + '&scope=' + _appConfig.FHIRConfig.get(_appConfig.ActiveEnv).scope + '&launch=' + launch + '&state=' + state + '&aud=' + iss;
                    return _context2.abrupt('return', redirectUrl);

                case 12:
                case 'end':
                    return _context2.stop();
            }
        }
    }, getaAuthorizeURL, this);
});

var buildState = function buildState(launch) {
    return '' + launch + Math.floor(Math.random() * 100000, 1) + Date.now();
};
//# sourceMappingURL=authorization-helper.js.map