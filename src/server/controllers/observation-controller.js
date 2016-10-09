import express from 'express';
import co from '../util/wrap';
import * as ObservationHelper from '../helper/observation-helper';
import * as Records from '../models/models';
import * as Constants from '../util/constants';


const router = express.Router();

router.get('/glucose/:state', co(function* (req, res, next) {
    try {
        const glucose = yield ObservationHelper.fetchGlucoseResults(req.params.state);
        res.send(glucose);
    } catch (err) {
        console.log('err = ' + err);
        next(err);
    }
}));

router.get('/labs/:state', co(function* (req,res,next){

}));

export default router;