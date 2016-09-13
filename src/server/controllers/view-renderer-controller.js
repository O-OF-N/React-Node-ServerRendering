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

const router = express.Router();

router.get('/', co(function* (req, res, next) {
    let iss = null, launch = null;
    ({ iss, launch } = req.query);
    const url = yield AuthorizationHelper.authorize(iss, launch);
    res.redirect(url);
}));

router.get('/callback', co(function* (req, res, next) {
    let code = null, state = null, accessToken = null, patient = 0;
    ({ code, state } = req.query);
    yield AuthorizationHelper.accessToken(code, state);
    const html = ReactDomServer.renderToString(
        React.createElement(Component)
    );
    res.header({ state });
    res.send(html);
}));

export default router;