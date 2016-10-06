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
var jade = require('react-jade');


const router = express.Router();

router.get('/', co(function* (req, res, next) {
    try {
        console.log('reached here>>>>>>>>>> / ');
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
        console.log('reached here>>>>>>>>>> /callback ');
        let code = null, state = null, accessToken = null, patient = 0;
        ({ code, state } = req.query);
        yield AuthorizationHelper.accessToken(code, state);
        var template = jade.compileFile(__dirname + '/../../views/index.jade');
        var html = ReactDomServer.renderToString(template({ state }));
        res.send(html);
    } catch (err) {
        console.log('err = ' + err);
        next(err);
    }
}));

export default router;