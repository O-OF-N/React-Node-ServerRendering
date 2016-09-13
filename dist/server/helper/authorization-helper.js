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
    var patient, accessToken, _ref, _ref2, userAuthenticationModel, requestBody, response, updateResponse;

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

                    console.log(userAuthenticationModel);
                    requestBody = new Records.AccessTokenRequestBody({ code: authorizationCode });

                    console.log('here????');
                    console.log(requestBody);
                    console.log(userAuthenticationModel.tokenURL);
                    _context.next = 13;
                    return httpService.post(userAuthenticationModel.tokenURL, requestBody, new Records.POSTHeader());

                case 13:
                    response = _context.sent;

                    console.log('here>>>>>>>>');
                    console.log(response);
                    patient = response.data.patient;

                    accessToken = response.data.access_token;
                    _context.next = 20;
                    return _UserAuthenticationSchema2.default.update(userAuthenticationModel._id, { authorizationCode: authorizationCode, patient: patient, accessToken: accessToken });

                case 20:
                    updateResponse = _context.sent;
                    return _context.abrupt('return', updateResponse);

                case 22:
                case 'end':
                    return _context.stop();
            }
        }
    }, accessTokenHelper, this);
});

var authorizeHelper = regeneratorRuntime.mark(function authorizeHelper(iss, launch) {
    var aud, response_type, client_id, redirect_uri, params, _FHIRConfig$get, state, issURl, response, authorizationURL, tokenURL, authModel, model, url;

    return regeneratorRuntime.wrap(function authorizeHelper$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    aud = iss;
                    response_type = void 0, client_id = void 0, redirect_uri = void 0, params = void 0;
                    _FHIRConfig$get = _appConfig.FHIRConfig.get(_appConfig.ActiveEnv);
                    response_type = _FHIRConfig$get.response_type;
                    client_id = _FHIRConfig$get.client_id;
                    redirect_uri = _FHIRConfig$get.redirect_uri;
                    state = buildState(launch);
                    issURl = decodeURIComponent(iss) + '/metadata';
                    _context2.next = 10;
                    return httpService.get(issURl, new Records.AuthorizationHeader());

                case 10:
                    response = _context2.sent;
                    authorizationURL = response.data.rest[0].security.extension[0].extension.filter(function (ext) {
                        return ext.url === 'authorize';
                    })[0].valueUri;
                    tokenURL = response.data.rest[0].security.extension[0].extension.filter(function (ext) {
                        return ext.url === 'token';
                    })[0].valueUri;
                    authModel = new Records.UserAuthentication({
                        iss: iss, state: state, authorizationURL: authorizationURL, tokenURL: tokenURL
                    });
                    _context2.next = 16;
                    return _UserAuthenticationSchema2.default.save(authModel);

                case 16:
                    model = _context2.sent;

                    params = { response_type: response_type, client_id: client_id, redirect_uri: redirect_uri };
                    _util2.default._extend(params, { launch: launch, state: state, aud: aud });
                    console.log('params = >>>>>>>>>>>>>>>>>>>>');
                    console.log(params);
                    url = buildRedirectUrl(authorizationURL, params);

                    console.log('url fetched = ' + url);
                    return _context2.abrupt('return', url);

                case 24:
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