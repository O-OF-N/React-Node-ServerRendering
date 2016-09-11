"use strict";
import express from 'express';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import Component from '../index';
import * as AuthorizationHelper from '../helper/authorization-helper';
import co from '../util/wrap';


const router = express.Router();

router.get('/', co(function* (req, res, next) {
    let iss = null, launch = null;
    ({ iss, launch } = req.query);
    const url = yield AuthorizationHelper.authorize(iss, launch);
    res.redirect(url);
}));

router.get('/callback', co(function* (req, res, next) {
    console.log('in call back');
    console.log(req.query);
    console.log(req.query.code);
    let code = null,state = null;
    ({ code, state } = req.query);
    yield AuthorizationHelper.accessToken(code);
    const html = ReactDomServer.renderToString(
        React.createElement(Component)
    );
    res.send(html);
}));

export default router;