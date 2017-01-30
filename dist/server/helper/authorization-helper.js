"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.accessToken = exports.authorize = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

var _exceptions = require('../util/exceptions');

var Exceptions = _interopRequireWildcard(_exceptions);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//public methods
var authorize = exports.authorize = function authorize(iss, launch) {
    return (0, _co2.default)(authorizeHelper.bind(undefined, iss, launch));
};

var accessToken = exports.accessToken = function accessToken(code, state) {
    return (0, _co2.default)(accessTokenHelper.bind(undefined, code, state));
};

//private methods
var accessTokenHelper = regeneratorRuntime.mark(function accessTokenHelper(authorizationCode, state) {
    var patient, accessToken, _ref, _ref2, userAuthenticationModel, requestBody, response, updated_at;

    return regeneratorRuntime.wrap(function accessTokenHelper$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    patient = void 0, accessToken = void 0;
                    _context.next = 3;
                    return _UserAuthenticationSchema2.default.findByState(state);

                case 3:
                    _ref = _context.sent;
                    _ref2 = _slicedToArray(_ref, 1);
                    userAuthenticationModel = _ref2[0];

                    if (userAuthenticationModel) {
                        _context.next = 8;
                        break;
                    }

                    throw new Exceptions.AuthenticationError('Invalid Authentication parameters');

                case 8:
                    if (userAuthenticationModel.accessToken) {
                        _context.next = 21;
                        break;
                    }

                    requestBody = new Records.AccessTokenRequestBody({ code: authorizationCode });
                    _context.next = 12;
                    return httpService.post(userAuthenticationModel.tokenURL, requestBody, new Records.POSTHeader());

                case 12:
                    response = _context.sent;
                    patient = response.data.patient;

                    accessToken = response.data.access_token;
                    updated_at = new Date();
                    _context.next = 18;
                    return _UserAuthenticationSchema2.default.update(userAuthenticationModel._id, { authorizationCode: authorizationCode, patient: patient, accessToken: accessToken, updated_at: updated_at });

                case 18:
                    return _context.abrupt('return', new Records.Authentication({ state: state }));

                case 21:
                    return _context.abrupt('return', new Date() - userAuthenticationModel.updated_at < Constants.EXPIRATION_TIME ? new Records.Authentication({ state: state }) : new Records.Authentication({ authenticated: false, iss: userAuthenticationModel.iss, launch: userAuthenticationModel.launch }));

                case 22:
                case 'end':
                    return _context.stop();
            }
        }
    }, accessTokenHelper, this);
});

var authorizeHelper = regeneratorRuntime.mark(function authorizeHelper(iss, launch) {
    var aud, response_type, client_id, redirect_uri, scope, params, _FHIRConfig$get, state, issURl, response, extension, authorizationURL, tokenURL, authModel, model, url;

    return regeneratorRuntime.wrap(function authorizeHelper$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    aud = iss;
                    response_type = void 0, client_id = void 0, redirect_uri = void 0, scope = void 0, params = void 0;
                    _FHIRConfig$get = _appConfig.FHIRConfig.get(_appConfig.ActiveEnv);
                    response_type = _FHIRConfig$get.response_type;
                    client_id = _FHIRConfig$get.client_id;
                    redirect_uri = _FHIRConfig$get.redirect_uri;
                    scope = _FHIRConfig$get.scope;
                    state = buildState(launch);
                    issURl = decodeURIComponent(iss) + '/metadata';
                    _context2.next = 11;
                    return httpService.get(issURl, new Records.AuthorizationHeader());

                case 11:
                    response = _context2.sent;
                    extension = response.data.rest[0].security.extension[0].extension;
                    authorizationURL = extension.filter(function (ext) {
                        return ext.url === 'authorize';
                    })[0].valueUri;
                    tokenURL = extension.filter(function (ext) {
                        return ext.url === 'token';
                    })[0].valueUri;
                    authModel = new Records.UserAuthentication({
                        iss: iss, state: state, authorizationURL: authorizationURL, tokenURL: tokenURL, launch: launch
                    });
                    _context2.next = 18;
                    return _UserAuthenticationSchema2.default.save(authModel);

                case 18:
                    model = _context2.sent;

                    params = { response_type: response_type, client_id: client_id, redirect_uri: redirect_uri, scope: scope };
                    _util2.default._extend(params, { launch: launch, state: state, aud: aud });
                    url = buildRedirectUrl(authorizationURL, params);
                    return _context2.abrupt('return', url);

                case 23:
                case 'end':
                    return _context2.stop();
            }
        }
    }, authorizeHelper, this);
});

var buildRedirectUrl = function buildRedirectUrl(authorizationURL, params) {
    return authorizationURL + '?' + Object.keys(params).map(function (key) {
        return key + '=' + params[key];
    }).join('&');
};

var buildState = function buildState(launch) {
    return '' + launch + Math.floor(Math.random() * 100000, 1) + Date.now();
};
//# sourceMappingURL=authorization-helper.js.map