import express from 'express';
import co from '../util/wrap';
import * as ObservationHelper from '../helper/observation-helper';
import * as Records from '../models/models';
import * as Constants from '../util/constants';
import * as ErrorHandle from '../error-handler';

const router = express.Router();

router.get('/glucose/:state', co(function* (req, res, next) {
    try {
        const glucose = yield ObservationHelper.fetchGlucoseResults(req.params.state);
        res.send(glucose);
    } catch (err) {
        console.log('err = ' + err);
        ErrorHandle.ErrorHandler("InternalServerError", res, err);

    }
}));

router.get('/labs/:state', co(function* (req, res, next) {
    try {
        const labs = yield ObservationHelper.fetchLabResults(req.params.state);
        res.send(labs);
    } catch (err) {
        console.log('err = ' + err);
        ErrorHandle.ErrorHandler("InternalServerError", res, err);

    }
}));

export default router;