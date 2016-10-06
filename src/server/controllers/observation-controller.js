import express from 'express';
import co from '../util/wrap';
import * as ObservationHelper from '../helper/observation-helper';
import * as Records from '../models/models';
import * as Constants from '../util/constants';


const router = express.Router();

router.get('/observations/:state', co(function* (req, res, next) {
    try {
        console.log('state = '+ req.params.state);
        const observations = yield ObservationHelper.fetchObservationResults(req.params.state);
        res.send(observations);
    } catch (err) {
        console.log('err = ' + err);
        next(err);
    }
}));

export default router;