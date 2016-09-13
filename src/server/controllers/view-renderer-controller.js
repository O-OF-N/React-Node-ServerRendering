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
        console.log('1>>>');
        let code = null, state = null, accessToken = null, patient = 0;
        console.log('2>>>');
        ({ code, state } = req.query);
        console.log('3>>>');
        const model = yield AuthorizationHelper.accessToken(code, state);
        console.log('the model is '+ model.state);
        console.log(model);
        const html = ReactDomServer.renderToString(
            React.createElement(Component)
        );
        res.header({ state });
        res.send(html);
    } catch (err) {
        console.log('err = ' + err);
        next(err);
    }
}));

export default router;