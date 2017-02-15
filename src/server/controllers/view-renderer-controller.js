"use strict";
import express from 'express';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import Component from '../index';
import * as AuthorizationHelper from '../helper/authorization-helper';
import co from '../util/wrap';
import * as ErrorHandler from '../error-handler';
import { get } from '../service/http-service'
import * as Records from '../models/models';
import * as Constants from '../util/constants';

const router = express.Router();

router.get('/', co(function* (req, res, next) {
    try {
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
    }
    //res.send(handleRenderer('Test state'));
}));

router.get('/callback', co(function* (req, res, next) {
    try {
        let code = null, state = null, accessToken = null, patient = 0;
        ({ code, state } = req.query);
        if (!(code && state)) invalidAuthParams(res);
        const authentication = yield AuthorizationHelper.accessToken(code, state);
        if (!authentication) invalidAuthParams(res);
        else if (!authentication.authenticated) {
            const url = yield AuthorizationHelper.authorize(authentication.iss, authentication.launch);
            if (!url) invalidAuthParams(res);
            res.redirect(url);
        } else res.send(handleRenderer(authentication.state));
    } catch (err) {
        console.log('err = ' + err);
        ErrorHandler.ErrorHandler("InternalServerError", res, err.message);
    }
}));


const invalidAuthParams = res =>
    ErrorHandler.ErrorHandler("AuthenticationError", res, "Invalid authentication parameters sent");

const handleRenderer = (state) => {
    const html = ReactDomServer.renderToString(
        React.createElement(Component)
    );
    return renderFullPage(html, state);
};

const renderFullPage = (html, state) => {
    console.log('State is logged as = ', state);
    return `
    <!doctype html>
<html style="width:100%;height:auto">

<head>
    <title>Diabetes Management</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/terra/css/terra.min.css">
    <script type="text/javascript">
        function evaluate(x) {
            return eval(x);
        }
        window.__PRELOADED_STATE__ = '${state}';
    </script>
    <script src="/terra/vendor/jquery/jquery-2.2.0.min.js"></script>
    <script src="/terra/vendor/cldrjs/cldr.min.js"></script>
    <script src="/terra/vendor/fastclick/fastclick.min.js"></script>
    <script src="/terra/vendor/jquery/jquery.are-you-sure-1.9.min.js"></script>
    <script src="/terra/vendor/jquery/jquery.validate-1.13.min.js"></script>
    <script src="/terra/vendor/jquery-fontspy/jQuery-FontSpy-3.0.min.js"></script>
    <script src="/terra/vendor/magnific-popup/magnific-popup-1.0.min.js"></script>
    <script src="/terra/vendor/media-match/media.match.min.js"></script>
    <script src="/terra/vendor/tooltipster/js/jquery.tooltipster-3.3.min.js"></script>
    <script src="/terra/js/terra.min.js"></script>
</head>

<body style="width:inherit;height:inherit">
    <div id="root-app" style="width:inherit;height:inherit">${html}</div>
</body>

</html>
    `
};

export default router;