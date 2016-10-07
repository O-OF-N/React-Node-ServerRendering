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

var _httpService = require('../service/http-service');

var _models = require('../models/models');

var Records = _interopRequireWildcard(_models);

var _constants = require('../util/constants');

var Constants = _interopRequireWildcard(_constants);

var _redux = require('redux');

var _reactRedux = require('react-redux');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*import {DiabeticsChart} from '../../public/javascripts/bundle'*/

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
                    _context.next = 7;
                    return AuthorizationHelper.authorize(iss, launch);

                case 7:
                    url = _context.sent;

                    res.redirect(url);
                    _context.next = 15;
                    break;

                case 11:
                    _context.prev = 11;
                    _context.t0 = _context['catch'](0);

                    console.log('err = ' + _context.t0);
                    next(_context.t0);

                case 15:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this, [[0, 11]]);
})));

router.get('/callback', (0, _wrap2.default)(regeneratorRuntime.mark(function _callee2(req, res, next) {
    var code, state, accessToken, patient, _req$query2;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.prev = 0;
                    code = null, state = null, accessToken = null, patient = 0;
                    _req$query2 = req.query;
                    code = _req$query2.code;
                    state = _req$query2.state;
                    _context2.next = 7;
                    return AuthorizationHelper.accessToken(code, state);

                case 7:
                    /*const html = ReactDomServer.renderToString(
                        React.createElement(Component)
                    );
                    res.header({ state });*/
                    res.send(handleRenderer(state));
                    _context2.next = 14;
                    break;

                case 10:
                    _context2.prev = 10;
                    _context2.t0 = _context2['catch'](0);

                    console.log('err = ' + _context2.t0);
                    next(_context2.t0);

                case 14:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, this, [[0, 10]]);
})));

var handleRenderer = function handleRenderer(state) {
    console.log('state = ' + state);
    var s = { state: state };
    var store = (0, _redux.createStore)(function () {
        return s;
    });
    console.log(store);
    console.log(store.getState());
    var html = _server2.default.renderToString(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_index2.default, null)
    ));
    var preloadedState = store.getState();
    return renderFullPage(renderFullPage(html, preloadedState));
};

var renderFullPage = function renderFullPage(html, preloadedState) {
    return '\n    <!doctype html>\n    <html>\n      <head>\n        <title>Diabetes Dashboard</title>\n      </head>\n      <body>\n        <div id="root">' + html + '</div>\n        <script>\n          window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState) + '\n        </script>\n      </body>\n    </html>\n    ';
};

exports.default = router;
//# sourceMappingURL=view-renderer-controller.js.map