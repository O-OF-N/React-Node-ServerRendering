"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchObservationResults = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _models = require('../models/models');

var Records = _interopRequireWildcard(_models);

var _immutable = require('immutable');

var _constants = require('../util/constants');

var Constants = _interopRequireWildcard(_constants);

var _httpService = require('../service/http-service');

var _UserAuthenticationSchema = require('../models/UserAuthenticationSchema');

var _UserAuthenticationSchema2 = _interopRequireDefault(_UserAuthenticationSchema);

var _utilFunctions = require('../util/util-functions');

var UtilFunctions = _interopRequireWildcard(_utilFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var fetchObservationResults = exports.fetchObservationResults = regeneratorRuntime.mark(function fetchObservationResults(state) {
    var _ref, _ref2, userAuthenticationModel, Authorization, header, url, result;

    return regeneratorRuntime.wrap(function fetchObservationResults$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return _UserAuthenticationSchema2.default.findByState(state);

                case 2:
                    _ref = _context.sent;
                    _ref2 = _slicedToArray(_ref, 1);
                    userAuthenticationModel = _ref2[0];
                    Authorization = 'Bearer ' + userAuthenticationModel.accessToken;
                    header = new Records.AccessHeader({ Authorization: Authorization });
                    url = UtilFunctions.buildObeservationURL(userAuthenticationModel.patient, ["glucose"], userAuthenticationModel.iss);
                    _context.next = 10;
                    return (0, _httpService.get)(url, new Records.AuthorizationHeader({ headers: { Accept: "application/json+fhir", Authorization: Authorization } }));

                case 10:
                    result = _context.sent;

                    console.log(result);
                    return _context.abrupt('return', checkResponseStatus(result) ? buildObservationFromJson(result) : null);

                case 13:
                case 'end':
                    return _context.stop();
            }
        }
    }, fetchObservationResults, this);
});

var checkResponseStatus = function checkResponseStatus(json) {
    return json && json.status && json.status === 200 ? true : false;
};

var buildObservationFromJson = function buildObservationFromJson(json) {
    var glucose = json.data.entry.map(function (entry) {
        if (entry && entry.resource) {
            var resource = entry.resource;
            return new Records.Observation({
                resource: resource.code ? resource.code.coding : null,
                date: resource.issued,
                quantity: resource.valueQuantity.value,
                interpretation: resource.interpretation && resource.interpretation.coding ? resource.interpretation.coding[0].code : null
            });
        }
    }).filter(function (entry) {
        return entry ? true : false;
    });
    return (0, _immutable.List)(glucose);
};
//# sourceMappingURL=observation-helper.js.map