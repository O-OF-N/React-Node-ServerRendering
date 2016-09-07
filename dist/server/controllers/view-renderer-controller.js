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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res, next) {
    console.log(req.query);
    var iss = null,
        launch = null;
    var _req$query = req.query;
    iss = _req$query.iss;
    launch = _req$query.launch;

    console.log('iss = ' + iss);
    console.log('launch = ' + launch);
    var html = _server2.default.renderToString(_react2.default.createElement(_index2.default));
    res.send(html);
});

router.get('/callback', function (req, res, next) {
    res.send('callback called');
});

exports.default = router;
//# sourceMappingURL=view-renderer-controller.js.map