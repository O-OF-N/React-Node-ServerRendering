"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchLabResults = exports.fetchGlucoseResults = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _models = require('../models/models');

var Records = _interopRequireWildcard(_models);

var _immutable = require('immutable');

var _constants = require('../util/constants');

var Constants = _interopRequireWildcard(_constants);

var _httpService = require('../service/http-service');

var _httpUtils = require('../util/http-utils');

var HttpUtil = _interopRequireWildcard(_httpUtils);

var _UserAuthenticationSchema = require('../models/UserAuthenticationSchema');

var _UserAuthenticationSchema2 = _interopRequireDefault(_UserAuthenticationSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//Public functions
var fetchGlucoseResults = exports.fetchGlucoseResults = regeneratorRuntime.mark(function fetchGlucoseResults(state) {
    var result;
    return regeneratorRuntime.wrap(function fetchGlucoseResults$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    return _context.delegateYield(fetchObservationResultsHelper(state, ["glucose"]), 't0', 1);

                case 1:
                    result = _context.t0;
                    return _context.abrupt('return', HttpUtil.checkResponseStatus(result) ? buildGlucoseResultsFromJson(result) : null);

                case 3:
                case 'end':
                    return _context.stop();
            }
        }
    }, fetchGlucoseResults, this);
});

var fetchLabResults = exports.fetchLabResults = regeneratorRuntime.mark(function fetchLabResults(state) {
    var result;
    return regeneratorRuntime.wrap(function fetchLabResults$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    return _context2.delegateYield(fetchObservationResultsHelper(state, ["ketones", "ph", "serum"]), 't0', 1);

                case 1:
                    result = _context2.t0;
                    return _context2.abrupt('return', HttpUtil.checkResponseStatus(result) ? buildLabResultsFromJson(result) : null);

                case 3:
                case 'end':
                    return _context2.stop();
            }
        }
    }, fetchLabResults, this);
});

//Private functions
var fetchObservationResultsHelper = regeneratorRuntime.mark(function fetchObservationResultsHelper(state, lonicCodes) {
    var _ref, _ref2, userAuthenticationModel, url, authHeader, result;

    return regeneratorRuntime.wrap(function fetchObservationResultsHelper$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.next = 2;
                    return _UserAuthenticationSchema2.default.findByState(state);

                case 2:
                    _ref = _context3.sent;
                    _ref2 = _slicedToArray(_ref, 1);
                    userAuthenticationModel = _ref2[0];
                    url = HttpUtil.buildObeservationURL(userAuthenticationModel.patient, lonicCodes, userAuthenticationModel.iss);
                    authHeader = HttpUtil.buildAuthorizationHeader(userAuthenticationModel);
                    _context3.next = 9;
                    return (0, _httpService.get)(url, authHeader);

                case 9:
                    result = _context3.sent;
                    return _context3.abrupt('return', result);

                case 11:
                case 'end':
                    return _context3.stop();
            }
        }
    }, fetchObservationResultsHelper, this);
});

var buildGlucoseResultsFromJson = function buildGlucoseResultsFromJson(json) {
    var glucose = json.data && json.data.entry ? json.data.entry.map(function (entry) {
        if (entry && entry.resource) {
            var resource = entry.resource;
            return new Records.Observation({
                resource: resource.code ? resource.code.coding : null,
                text: resource.code ? resource.code.text : null,
                date: resource.issued,
                quantity: resource.valueQuantity.value,
                interpretation: resource.interpretation && resource.interpretation.coding ? resource.interpretation.coding[0].code : null
            });
        }
    }).filter(function (entry) {
        return entry ? true : false;
    }) : null;
    return (0, _immutable.List)(glucose);
};

var buildLabResultsFromJson = function buildLabResultsFromJson(json) {
    var lab = json.data && json.data.entry ? json.data.entry.map(function (entry) {
        if (entry && entry.resource) {
            var resource = entry.resource;
            console.log(resource);
            return new Records.Observation({
                resource: resource.code ? resource.code.coding : null,
                text: resource.code ? resource.code.text : null,
                date: resource.issued,
                quantity: resource.valueQuantity ? resource.valueQuantity.value + resource.valueQuantity.unit : null,
                interpretation: resource.interpretation && resource.interpretation.coding ? resource.interpretation.coding[0].code : null
            });
        }
    }).filter(function (entry) {
        return entry ? true : false;
    }) : null;
    return (0, _immutable.List)(lab);
};
//# sourceMappingURL=observation-helper.js.map