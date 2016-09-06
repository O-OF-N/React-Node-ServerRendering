'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bluebird = require('bluebird');

var wrap = function wrap(genFn) {
    var coroutine = (0, _bluebird.coroutine)(genFn);
    return function (req, res, next) {
        coroutine(req, res, next).catch(next);
    };
};

exports.default = wrap;
//# sourceMappingURL=wrap.js.map