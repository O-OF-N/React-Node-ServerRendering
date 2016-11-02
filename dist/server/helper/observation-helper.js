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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//Public functions
var fetchGlucoseResults = exports.fetchGlucoseResults = regeneratorRuntime.mark(function fetchGlucoseResults(state) {
    var result;
    return regeneratorRuntime.wrap(function fetchGlucoseResults$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    return _context.delegateYield(fetchObservationResultsHelper(state, Constants.GLUCOSE_CODES), 't0', 1);

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
    var result, labs;
    return regeneratorRuntime.wrap(function fetchLabResults$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    return _context2.delegateYield(fetchObservationResultsHelper(state, Constants.LABS_LOINIC_CODES), 't0', 1);

                case 1:
                    result = _context2.t0;
                    labs = HttpUtil.checkResponseStatus(result) ? buildLabResultsFromJson(result) : null;
                    return _context2.abrupt('return', groupLabs(Constants.LABS_LOINIC_CODES, labs));

                case 4:
                case 'end':
                    return _context2.stop();
            }
        }
    }, fetchLabResults, this);
});

//Private functions
var fetchObservationResultsHelper = regeneratorRuntime.mark(function fetchObservationResultsHelper(state, lonicCodesList) {
    var date = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var duration = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

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
                    url = HttpUtil.buildObeservationURL(userAuthenticationModel.patient, flatMap(lonicCodesList), userAuthenticationModel.iss, getDateRange(date, duration));
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

var flatMap = function flatMap(lonicCodesList) {
    var lonicCodes = [];
    lonicCodesList ? lonicCodesList.forEach(function (codes) {
        var lonicCode = Constants.LONIC_CODES.get(codes);
        lonicCode instanceof Array ? lonicCodes.push.apply(lonicCodes, _toConsumableArray(lonicCode)) : lonicCodes.push(lonicCode);
    }) : null;
    console.log('lonic codes = ');
    console.log(lonicCodes);
    return lonicCodes;
};

var groupLabs = function groupLabs(loincCodes, results) {
    return loincCodes.map(function (lc) {
        return buildResultLoincMap(lc, Constants.LONIC_CODES.get(lc), results);
    }).filter(function (r) {
        return r.observation.size;
    });
};

var buildResultLoincMap = function buildResultLoincMap(lc, code, results) {
    return new Records.LabResult({ code: lc, observation: results.filter(function (r) {
            return code.includes(r.resource);
        }).sort(function (r) {
            return r.date;
        }).slice(0, Constants.LAB_RESULT_COUNT) });
};

var getDateRange = function getDateRange(date, duration) {
    if (date && duration) {
        var today = new Date(date);
        var yesterday = new Date(today);
        yesterday.setHours(today.getHours() - 24);
        return [new Date(yesterday).toISOString(), today.toISOString()];
    }
    return null;
};

var buildGlucoseResultsFromJson = function buildGlucoseResultsFromJson(json) {
    var glucose = json.data && json.data.entry ? json.data.entry.map(function (entry) {
        if (entry && entry.resource) {
            var resource = entry.resource;
            return buildObservationFromResource(resource);
        }
    }).filter(function (entry) {
        return entry ? true : false;
    }).sort(compare) : null;
    return (0, _immutable.List)(glucose);
};

var buildLabResultsFromJson = function buildLabResultsFromJson(json) {
    var lab = json.data && json.data.entry ? json.data.entry.map(function (entry) {
        if (entry && entry.resource) {
            var resource = entry.resource;
            return buildObservationFromResource(resource);
        }
    }).filter(function (entry) {
        return entry ? true : false;
    }) : null;
    return (0, _immutable.List)(lab);
};

var buildObservationFromResource = function buildObservationFromResource(resource) {
    return new Records.Observation({
        resource: resource.code && resource.code.coding ? resource.code.coding.filter(function (code) {
            return code.system === Constants.LONIC_URL;
        })[0]['code'] : null,
        text: resource.code ? resource.code.text : null,
        date: resource.issued,
        quantity: resource.valueQuantity && resource.valueQuantity.value ? resource.valueQuantity.value : null,
        unit: resource.valueQuantity && resource.valueQuantity.unit ? resource.valueQuantity.unit : null,
        interpretation: resource.interpretation && resource.interpretation.coding ? resource.interpretation.coding[0].code : null,
        source: resource.category && resource.category.coding ? resource.category.coding.filter(function (code) {
            return code.system === Constants.OBSERVATION_CATEGORY_URL;
        })[0]['code'] : null
    });
};

var compare = function compare(r1, r2) {
    return r1 && r2 ? r1.text.toLowerCase() > r2.text.toLowerCase() ? 1 : r2.text.toLowerCase() > r1.text.toLowerCase() ? -1 : r1.date > r2.date ? 1 : -1 : 0;
};
//# sourceMappingURL=observation-helper.js.map