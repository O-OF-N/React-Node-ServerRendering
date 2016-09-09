'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrap = function wrap(genFn) {
    return function (req, res, next) {
        _co2.default.wrap(genFn)(req, res, next).catch(next);
    };
}; //import {coroutine as co} from 'bluebird';
exports.default = wrap;
//# sourceMappingURL=wrap.js.map