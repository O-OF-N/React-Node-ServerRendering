'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fhirResourceService = require('../service/fhir-resource-service');

var _wrap = require('../util/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var _glucoseResourceHelper = require('../helper/glucose-resource-helper');

var GlucoseHelper = _interopRequireWildcard(_glucoseResourceHelper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/glucose', (0, _wrap2.default)(regeneratorRuntime.mark(function _callee(req, res, next) {
    var result, glucose;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return (0, _fhirResourceService.serverCall)();

                case 3:
                    result = _context.sent;
                    glucose = GlucoseHelper.fetchGlucoseResults(result);

                    res.send(glucose);
                    _context.next = 12;
                    break;

                case 8:
                    _context.prev = 8;
                    _context.t0 = _context['catch'](0);

                    console.log('err = ' + _context.t0);
                    next(_context.t0);

                case 12:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this, [[0, 8]]);
})));

exports.default = router;
//# sourceMappingURL=glucose-results-controller.js.map