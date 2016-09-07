import express from 'express';
import co from '../util/wrap';

const router = express.Router();

router.get('/launch', co(function* (req, res, next) {

}));

export default router;