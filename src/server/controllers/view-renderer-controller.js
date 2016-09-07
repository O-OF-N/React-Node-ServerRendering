"use strict";
import express from 'express';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import Component from '../index'

const router = express.Router();

router.get('/',function(req,res,next){
    console.log(req.query);
    let iss = null,launch = null;
    ({iss,launch} = req.query);
    console.log('iss = ' + iss);
    console.log('launch = ' + launch);
    const html = ReactDomServer.renderToString(
        React.createElement(Component)
    );
    res.send(html);
});

router.get('/callback', (req,res,next)=>{
    res.send('callback called');
})

export default router;