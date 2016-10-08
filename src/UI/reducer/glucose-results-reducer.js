import { List as immutableList } from 'immutable';
import * as Constants from '../utils/constants';
import * as Records from '../records/records';

const init = new Records.GlucoseObject({});

const reducer = (glucoseObject = init, action) => {
    switch (action.type) {
        case Constants.GLUCOSE_FETCHING:
            return glucoseObject.merge({
                fetching: true,
                fetched: false,
                error: action.payLoad
            });
        case Constants.GLUCOSE_FETCHED:
            const payLoad = !action.payLoad? immutableList([]) : action.payLoad;
            return glucoseObject.merge({
                glucose: action.payLoad,
                fetched: true,
                fetching: false,
                error: null
            });
        case Constants.GLUCOSE_ERROR:
            return glucoseObject.merge({
                fetching: false,
                fetched: true,
                error: action.payLoad
            });
        default:
            return glucoseObject;
    };
};
export default reducer;