'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _wrap = require('../util/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var _medicationHelper = require('../helper/medication-helper');

var MedicationHelper = _interopRequireWildcard(_medicationHelper);

var _models = require('../models/models');

var Records = _interopRequireWildcard(_models);

var _constants = require('../util/constants');

var Constants = _interopRequireWildcard(_constants);

var _exceptions = require('../util/exceptions');

var Exceptions = _interopRequireWildcard(_exceptions);

var _errorHandler = require('../error-handler');

var ErrorHandle = _interopRequireWildcard(_errorHandler);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/orders/:state', (0, _wrap2.default)(regeneratorRuntime.mark(function _callee(req, res, next) {
    var medications;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return MedicationHelper.fetchMedications(req.params.state);

                case 3:
                    medications = _context.sent;

                    res.send(medications);
                    _context.next = 11;
                    break;

                case 7:
                    _context.prev = 7;
                    _context.t0 = _context['catch'](0);

                    console.log(_context.t0.name);
                    ErrorHandle.ErrorHandler("InternalServerError", res, _context.t0);

                case 11:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this, [[0, 7]]);
})));

exports.default = router;
//# sourceMappingURL=medication-controller.js.map