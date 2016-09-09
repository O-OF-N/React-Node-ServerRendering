import express from 'express';
import {serverCall} from '../service/fhir-resource-service'
import co from '../util/wrap';
import * as GlucoseHelper from '../helper/glucose-resource-helper';

const router = express.Router();

router.get('/glucose', co(function* (req, res, next) {
    try {
        const result = yield serverCall();
        const glucose = GlucoseHelper.fetchGlucoseResults(result);
        res.send(glucose);
    } catch (err) {
        console.log('err = ' + err);
        next(err);
    }
}));

export default router;