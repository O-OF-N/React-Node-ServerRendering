"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _authorizationHelper = require('../helper/authorization-helper');

var AuthorizationHelper = _interopRequireWildcard(_authorizationHelper);

var _wrap = require('../util/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', (0, _wrap2.default)(regeneratorRuntime.mark(function _callee(req, res, next) {
    var iss, launch, _req$query, url;

    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    iss = null, launch = null;
                    _req$query = req.query;
                    iss = _req$query.iss;
                    launch = _req$query.launch;
                    _context.next = 6;
                    return AuthorizationHelper.authorize(iss, launch);

                case 6:
                    url = _context.sent;

                    res.redirect(url);

                case 8:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
})));

router.get('/callback', (0, _wrap2.default)(regeneratorRuntime.mark(function _callee2(req, res, next) {
    var code, _req$query2, html;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    console.log('in call back');
                    console.log(req.query);
                    console.log(req.query.code);
                    code = null;
                    _req$query2 = req.query;
                    code = _req$query2.code;
                    state = _req$query2.state;
                    _context2.next = 9;
                    return AuthorizationHelper.accessToken(code);

                case 9:
                    html = _server2.default.renderToString(_react2.default.createElement(_index2.default));

                    res.send(html);

                case 11:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, this);
})));

exports.default = router;
//# sourceMappingURL=view-renderer-controller.js.map