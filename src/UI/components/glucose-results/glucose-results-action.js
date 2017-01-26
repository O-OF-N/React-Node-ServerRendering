import * as Constants from '../../utils/constants';
import axios from 'axios';
import * as Records from '../../records/records';
import co from 'co';


export const fetchGlucose = state => dispatch => {
    co(fetchGlucoseHelper.bind(null, state, dispatch))
        .catch((err) => {
            const errImmutable = err ? new Records.HttpError(err) : new Records.HttpError();
            dispatch({ type: Constants.GLUCOSE_ERROR, payLoad: errImmutable });
        });

};

const fetchGlucoseHelper = function* (state, dispatch) {
    dispatch({ type: Constants.GLUCOSE_FETCHING });
    const glucoseList = yield axios.get(Constants.GLUCOSE_FETCH_URL.concat(`/${state.state}`), { headers: Constants.AUTHORIZATION_HEADER });
    try {
        const data = (glucoseList && glucoseList.data) ? glucoseList.data : null;
        if (data) {
            const glucoseObj = data.map(glucose => new Records.Glucose(glucose));
            dispatch({ type: Constants.GLUCOSE_FETCHED, payLoad: glucoseObj });
        } else
            throw { message: "glucose list is not fetched" };
    } catch (err) {
        const errImmutable = err ? new Records.HttpError(err.message) : new Records.HttpError();
        dispatch({ type: Constants.GLUCOSE_ERROR, payLoad: errImmutable });
    }
};