import { List as immutableList } from 'immutable';
import * as Constants from '../utils/constants';
import * as Records from '../records/records';

const init = new Records.SlidingScale({});

const reducer = (slidingScale = init, action) => {
    switch (action.type) {
        case Constants.SET_CARBOHYDRATE_COVERAGE:
            const carbohydrateCoverage = !action.payLoad ? null : action.payLoad;
            return slidingScale.merge({ carbohydrateCoverage });
        case Constants.SET_BLOOD_GLUCOSE_COVERAGE:
            const bloodGlucoseCoverage = !action.payLoad ? immutableList([]) : immutableList(action.payLoad);
            return slidingScale.merge({ bloodGlucoseCoverage });
        case Constants.SLIDING_SCALE_TOTAL:
            const totalResult = action.payLoad && typeof action.payLoad === 'number' ? action.payLoad : 0;
            return slidingScale.merge({
                totalResult: totalResult
            });
        case Constants.CLEAR_SLIDING_SCALE:
            return new slidingScale();
        case Constants.SLIDING_SCALE_TOGGLE_VISIBILITY:
            return slidingScale.merge({
                visible: !slidingScale.visible
            });
        default:
            return slidingScale;
    };
};
export default reducer;