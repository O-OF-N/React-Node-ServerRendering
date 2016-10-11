'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _wrap = require('../util/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var _observationHelper = require('../helper/observation-helper');

var ObservationHelper = _interopRequireWildcard(_observationHelper);

var _models = require('../models/models');

var Records = _interopRequireWildcard(_models);

var _constants = require('../util/constants');

var Constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/glucose/:state', (0, _wrap2.default)(regeneratorRuntime.mark(function _callee(req, res, next) {
    var glucose;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return ObservationHelper.fetchGlucoseResults(req.params.state);

                case 3:
                    glucose = _context.sent;

                    res.send(glucose);
                    _context.next = 11;
                    break;

                case 7:
                    _context.prev = 7;
                    _context.t0 = _context['catch'](0);

                    console.log('err = ' + _context.t0);
                    next(_context.t0);

                case 11:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this, [[0, 7]]);
})));

router.get('/labs/:state', (0, _wrap2.default)(regeneratorRuntime.mark(function _callee2(req, res, next) {
    var labs;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return ObservationHelper.fetchLabResults(req.params.state);

                case 3:
                    labs = _context2.sent;

                    res.send(labs);
                    _context2.next = 11;
                    break;

                case 7:
                    _context2.prev = 7;
                    _context2.t0 = _context2['catch'](0);

                    console.log('err = ' + _context2.t0);
                    next(_context2.t0);

                case 11:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, this, [[0, 7]]);
})));

exports.default = router;
//# sourceMappingURL=observation-controller.js.map