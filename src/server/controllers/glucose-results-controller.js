import express from 'express';
import co from '../util/wrap';
import * as GlucoseHelper from '../helper/glucose-resource-helper';
import * as Records from '../models/models';
import * as Constants from '../util/constants';


const router = express.Router();

router.get('/glucose', co(function* (req, res, next) {
    try {
        const glucose = GlucoseHelper.fetchGlucoseResults(result);
        res.send(glucose);
    } catch (err) {
        console.log('err = ' + err);
        next(err);
    }
}));

export default router;