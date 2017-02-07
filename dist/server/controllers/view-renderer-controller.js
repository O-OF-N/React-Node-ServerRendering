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
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    /* try {
                         let iss = null, launch = null;
                         ({ iss, launch } = req.query);
                         if (iss && launch) {
                             const url = yield AuthorizationHelper.authorize(iss, launch);
                             res.redirect(url);
                         } else
                             invalidAuthParams(res);
                     } catch (err) {
                         console.log('err = ' + err);
                         ErrorHandler.ErrorHandler("InternalServerError", res, err.message);
                     }*/
                    res.send(handleRenderer('Test state'));

                case 1:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
})));

router.get('/callback', (0, _wrap2.default)(regeneratorRuntime.mark(function _callee2(req, res, next) {
    var code, state, accessToken, patient, _req$query, authentication, url;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.prev = 0;
                    code = null, state = null, accessToken = null, patient = 0;
                    _req$query = req.query;
                    code = _req$query.code;
                    state = _req$query.state;

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
    return renderFullPage(renderFullPage(html, state));
};

var renderFullPage = function renderFullPage(html, state) {
    return '\n    <!doctype html>\n    <html style="width:100%;height:100%">\n      <head>\n        <title>Diabetes Dashboard</title>\n        <meta charset="utf-8">\n        <meta http-equiv="X-UA-Compatible" content="IE=edge">\n        <script type="text/javascript">  \n            function evaluate(x) {\n                return eval(x);\n            }\n            window.__PRELOADED_STATE__ = \'' + state + '\'\n        </script>\n      </head>\n      <body style="width:inherit;height:inherit">\n        <div id="root-app" style="width:inherit;height:inherit">' + html + '</div>\n      </body>\n    </html>\n    ';
};

exports.default = router;
//# sourceMappingURL=view-renderer-controller.js.map