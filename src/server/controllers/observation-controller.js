import express from 'express';
import co from '../util/wrap';
import * as ObservationHelper from '../helper/observation-helper';
import * as Records from '../models/models';
import * as Constants from '../util/constants';


const router = express.Router();

router.get('/observations', co(function* (req, res, next) {
    try {
        const glucose = ObservationHelper.fetchObservationResults(result);
        res.send(glucose);
    } catch (err) {
        console.log('err = ' + err);
        next(err);
    }
}));

export default router;