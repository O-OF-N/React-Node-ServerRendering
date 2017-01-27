import * as Constants from '../../utils/constants';
import axios from 'axios';
import * as Records from '../../records/records';
import co from 'co';
import { Map as immutableMap } from 'immutable';


export const fetchMedications = state => dispatch => {
    co(fetchMedicationsHelper.bind(null, state, dispatch))
        .catch((err) => {
            const errImmutable = err ? new Records.HttpError(err) : new Records.HttpError();
            dispatch({ type: Constants.MEDICATIONS_ERROR, payLoad: errImmutable });
        });

};

const fetchMedicationsHelper = function* (state, dispatch) {
    dispatch({ type: Constants.MEDICATIONS_FETCHING });
    const medList = yield axios.get(Constants.MEDICATIONS_FETCH_URL.concat(`/${12343}`), { headers: Constants.AUTHORIZATION_HEADER });
    try {
        const data = (medList && medList.data) ? medList.data : null;
        console.log(data);
        if (data) {
            const medObj = data.map(med => med.medications.length ? new Records.MedicationOrder({ type: med.type, medications: med.medications.map(m => (Records.Medication(m))) }) : null);
            dispatch({ type: Constants.MEDICATIONS_FETCHED, payLoad: medObj.filter(a => a) });
        } else
            throw { message: "medications not fetched" };
    } catch (err) {
        const errImmutable = err ? new Records.HttpError(err.message) : new Records.HttpError();
        dispatch({ type: Constants.MEDICATIONS_ERROR, payLoad: errImmutable });
    }
};