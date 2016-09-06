const express = require('express');
const serverCall = require('../service/fhir-resource-service').serverCall;
const co = require('../util/wrap');
const GlucoseService = require('../helper/glucose-resource-helper');

const router = express.Router();

router.get('/', co(function* (req, res, next) {
    try {
        const result = yield serverCall();
        const glucose = GlucoseService.fetchGlucoseResults(result);
        res.send(glucose);
    } catch (err) {
        console.log('err = ' + err);
        next(err);
    }
}));

module.exports = router;
