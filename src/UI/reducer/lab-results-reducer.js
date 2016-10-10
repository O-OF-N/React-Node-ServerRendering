import { List as immutableList } from 'immutable';
import * as Constants from '../utils/constants';
import * as Records from '../records/records';

const init = new Records.LabObject({});

const reducer = (labObject = init, action) => {
    switch (action.type) {
        case Constants.LAB_FETCHING:
            return labObject.merge({
                fetching: true,
                fetched: false,
                error: action.payLoad
            });
        case Constants.LAB_FETCHED:
            const payLoad = !action.payLoad? immutableList([]) : action.payLoad;
            return labObject.merge({
                labs: action.payLoad,
                fetched: true,
                fetching: false,
                error: null
            });
        case Constants.LAB_ERROR:
            return labObject.merge({
                fetching: false,
                fetched: true,
                error: action.payLoad
            });
        default:
            return labObject;
    };
};
export default reducer;