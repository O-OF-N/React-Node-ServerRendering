import {coroutine as co} from 'bluebird';

const wrap = (genFn) => {
    var coroutine = co(genFn);
    return (req, res, next) => {
        coroutine(req, res, next).catch(next);
    };
};

export default wrap;