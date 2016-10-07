"use strict";
import express from 'express';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import Component from '../index';
import * as AuthorizationHelper from '../helper/authorization-helper';
import co from '../util/wrap';
import {get} from '../service/http-service'
import * as Records from '../models/models';
import * as Constants from '../util/constants';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
/*import {DiabeticsChart} from '../../public/javascripts/bundle'*/

const router = express.Router();

router.get('/', co(function* (req, res, next) {
    try {
        let iss = null, launch = null;
        ({ iss, launch } = req.query);
        const url = yield AuthorizationHelper.authorize(iss, launch);
        res.redirect(url);
    } catch (err) {
        console.log('err = ' + err);
        next(err);
    }
}));

router.get('/callback', co(function* (req, res, next) {
    try {
        let code = null, state = null, accessToken = null, patient = 0;
        ({ code, state } = req.query);
        yield AuthorizationHelper.accessToken(code, state);
        /*const html = ReactDomServer.renderToString(
            React.createElement(Component)
        );
        res.header({ state });*/
        res.send(handleRenderer(state));
    } catch (err) {
        console.log('err = ' + err);
        next(err);
    }
}));

const handleRenderer = (state) => {
    console.log('state = ' + state);
    const html = ReactDomServer.renderToString(
        React.createElement(Component)
    );
    return renderFullPage(renderFullPage(html, state))
}

const renderFullPage = (html, state) => {
    return `
    <!doctype html>
    <html>
      <head>
        <title>Diabetes Dashboard</title>
        <script>
          window.__PRELOADED_STATE__ = '${state}'
        </script>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
    `
};

export default router;