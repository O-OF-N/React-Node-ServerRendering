import { List as immutableList } from 'immutable';
import * as Constants from '../utils/constants';
import * as Records from '../records/records';

const init = new Records.ObservationObject({});

const reducer = (observationObject = init, action) => {
    switch (action.type) {
        case Constants.OBSERVATIONS_FETCHED:
            const payLoad = action.payLoad === null ? immutableList([]) : action.payLoad;
            return observationObject.merge({
                glucose: action.payLoad,
                fetched: true,
                fetching: false,
                error: null
            });
        case Constants.OBSERVATIONS_ERROR:
            return observationObject.merge({
                fetching: false,
                fetched: true,
                error: action.payLoad
            });
        default:
            return observationObject;
    };
};
export default reducer;