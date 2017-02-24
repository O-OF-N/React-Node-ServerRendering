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

var _errorHandler = require('../error-handler');

var ErrorHandler = _interopRequireWildcard(_errorHandler);

var _httpService = require('../service/http-service');

var _models = require('../models/models');

var Records = _interopRequireWildcard(_models);

var _constants = require('../util/constants');

var Constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', (0, _wrap2.default)(regeneratorRuntime.mark(function _callee(req, res, next) {
    var iss, launch, _req$query, url;

    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.prev = 0;
                    iss = null, launch = null;
                    _req$query = req.query;
                    iss = _req$query.iss;
                    launch = _req$query.launch;

                    if (!(iss && launch)) {
                        _context.next = 12;
                        break;
                    }

                    _context.next = 8;
                    return AuthorizationHelper.authorize(iss, launch);

                case 8:
                    url = _context.sent;

                    res.redirect(url);
                    _context.next = 13;
                    break;

                case 12:
                    invalidAuthParams(res);

                case 13:
                    _context.next = 19;
                    break;

                case 15:
                    _context.prev = 15;
                    _context.t0 = _context['catch'](0);

                    console.log('err = ' + _context.t0);
                    ErrorHandler.ErrorHandler("InternalServerError", res, _context.t0.message);

                case 19:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this, [[0, 15]]);
})));

router.get('/callback', (0, _wrap2.default)(regeneratorRuntime.mark(function _callee2(req, res, next) {
    var code, state, accessToken, patient, _req$query2, authentication, url;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.prev = 0;
                    code = null, state = null, accessToken = null, patient = 0;
                    _req$query2 = req.query;
                    code = _req$query2.code;
                    state = _req$query2.state;

                    if (!(code && state)) invalidAuthParams(res);
                    _context2.next = 8;
                    return AuthorizationHelper.accessToken(code, state);

                case 8:
                    authentication = _context2.sent;

                    if (authentication) {
                        _context2.next = 13;
                        break;
                    }

                    invalidAuthParams(res);
                    _context2.next = 22;
                    break;

                case 13:
                    if (authentication.authenticated) {
                        _context2.next = 21;
                        break;
                    }

                    _context2.next = 16;
                    return AuthorizationHelper.authorize(authentication.iss, authentication.launch);

                case 16:
                    url = _context2.sent;

                    if (!url) invalidAuthParams(res);
                    res.redirect(url);
                    _context2.next = 22;
                    break;

                case 21:
                    res.send(handleRenderer(authentication.state));

                case 22:
                    _context2.next = 28;
                    break;

                case 24:
                    _context2.prev = 24;
                    _context2.t0 = _context2['catch'](0);

                    console.log('err = ' + _context2.t0);
                    ErrorHandler.ErrorHandler("InternalServerError", res, _context2.t0.message);

                case 28:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, this, [[0, 24]]);
})));

var invalidAuthParams = function invalidAuthParams(res) {
    return ErrorHandler.ErrorHandler("AuthenticationError", res, "Invalid authentication parameters sent");
};

var handleRenderer = function handleRenderer(state) {
    var html = _server2.default.renderToString(_react2.default.createElement(_index2.default));
    return renderFullPage(html, state);
};

var renderFullPage = function renderFullPage(html, state) {
    console.log('State is logged as = ', state);
    return '\n    <!doctype html>\n<html style="width:100%;height: 100%;overflow-y: auto;\n    min-height: 800px;">\n\n<head>\n    <title>Diabetes Management</title>\n    <meta charset="utf-8">\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <link rel="stylesheet" type="text/css" href="/terra/css/terra.min.css">\n    <script type="text/javascript">\n        function evaluate(x) {\n            return eval(x);\n        }\n        window.__PRELOADED_STATE__ = \'' + state + '\';\n    </script>\n    <script src="/terra/vendor/jquery/jquery-2.2.0.min.js"></script>\n    <script src="/terra/vendor/cldrjs/cldr.min.js"></script>\n    <script src="/terra/vendor/fastclick/fastclick.min.js"></script>\n    <script src="/terra/vendor/jquery/jquery.are-you-sure-1.9.min.js"></script>\n    <script src="/terra/vendor/jquery/jquery.validate-1.13.min.js"></script>\n    <script src="/terra/vendor/jquery-fontspy/jQuery-FontSpy-3.0.min.js"></script>\n    <script src="/terra/vendor/magnific-popup/magnific-popup-1.0.min.js"></script>\n    <script src="/terra/vendor/media-match/media.match.min.js"></script>\n    <script src="/terra/vendor/tooltipster/js/jquery.tooltipster-3.3.min.js"></script>\n    <script src="/terra/js/terra.min.js"></script>\n</head>\n\n<body style="width:inherit;height:inherit">\n    <div id="root-app" style="width:inherit;height:inherit">' + html + '</div>\n</body>\n\n</html>\n    ';
};

exports.default = router;
//# sourceMappingURL=view-renderer-controller.js.map