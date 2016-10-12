import { List as immutableList } from 'immutable';
import * as Constants from '../utils/constants';
import * as Records from '../records/records';

const init = new Records.MedicationObject({});

const reducer = (medicationObject = init, action) => {
    switch (action.type) {
        case Constants.MEDICATIONS_FETCHING:
            return medicationObject.merge({
                fetching: true,
                fetched: false,
                error: action.payLoad
            });
        case Constants.MEDICATIONS_FETCHED:
            const payLoad = !action.payLoad? immutableList([]) : action.payLoad;
            console.log(payLoad);
            return medicationObject.merge({
                medications: action.payLoad,
                fetched: true,
                fetching: false,
                error: null
            });
        case Constants.MEDICATIONS_ERROR:
            return medicationObject.merge({
                fetching: false,
                fetched: true,
                error: action.payLoad
            });
        default:
            return medicationObject;
    };
};
export default reducer;