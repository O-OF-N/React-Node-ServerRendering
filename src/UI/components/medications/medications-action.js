import * as Constants from '../../utils/constants';
import axios from 'axios';
import * as Records from '../../records/records';
import co from 'co';


export const fetchMedications = state => dispatch => {
    co(fetchMedicationsHelper.bind(null, state, dispatch))
        .catch((err) => {
            const errImmutable = err ? new Records.HttpError(err) : new Records.HttpError();
            dispatch({ type: Constants.MEDICATIONS_ERROR, payLoad: errImmutable });
        });

};

const fetchMedicationsHelper = function* (state, dispatch) {
    dispatch({ type: Constants.MEDICATIONS_FETCHING });
    const medList = yield axios.get(Constants.MEDICATIONS_FETCH_URL.concat(`/${state.state}`), { headers: Constants.AUTHORIZATION_HEADER });
    try {
        const data = (medList && medList.data) ? medList.data : null;
        if (data) {
            const medObj = data.map(med => new Records.Medication(med));
            dispatch({ type: Constants.MEDICATIONS_FETCHED, payLoad: medObj });
        } else
            throw { message: "medications not fetched" };
    } catch (err) {
        const errImmutable = err ? new Records.HttpError(err.message) : new Records.HttpError();
        dispatch({ type: Constants.MEDICATIONS_ERROR, payLoad: errImmutable });
    }
};