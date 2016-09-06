"use strict";
import express from 'express';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import Component from '../index'

const router = express.Router();

router.get('/',function(req,res,next){
    const html = ReactDomServer.renderToString(
        React.createElement(Component)
    );
    res.send(html);
});

export default router;