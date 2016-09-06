"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchGlucoseResults = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _models = require('../models/models');

var Records = _interopRequireWildcard(_models);

var _immutable = require('immutable');

var _constants = require('../util/constants');

var Constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var fetchGlucoseResults = exports.fetchGlucoseResults = function fetchGlucoseResults(json) {
    return checkResponseStatus(json) ? buildObservationFromJson(json) : null;
};

var checkResponseStatus = function checkResponseStatus(json) {
    return json && json.status && json.status === 200 ? true : false;
};

var buildObservationFromJson = function buildObservationFromJson(json) {
    var glucose = json.data.entry.map(function (entry) {
        if (entry.resource.code.coding) {
            var _entry$resource$code$ = _slicedToArray(entry.resource.code.coding, 1);

            var code = _entry$resource$code$[0];

            if (code.code == Constants.GLUCOSE_CODE) {
                return new Records.Observation({
                    date: entry.resource.issued,
                    quantity: entry.resource.valueQuantity.value,
                    interpretation: entry.resource.interpretation.coding[0].code
                });
            }
        }
    }).filter(function (entry) {
        return entry ? true : false;
    });
    return (0, _immutable.List)(glucose);
};
//# sourceMappingURL=glucose-resource-helper.js.map