import express from 'express';
import co from '../util/wrap';
import * as MedicationHelper from '../helper/medication-helper';
import * as Records from '../models/models';
import * as Constants from '../util/constants';
import * as Exceptions from '../util/exceptions'

const router = express.Router();

router.get('/orders/:state', co(function* (req, res, next) {
    try {
        const medications = yield MedicationHelper.fetchMedications(req.params.state);
        res.send(medications);
    } catch (err) {
        console.log('err = ' + err);
        console.log('err = ' + typeof err);
        console.log('err type = ', err instanceof Exceptions.InvalidStateError);
        next(err);
    }
}));

export default router;