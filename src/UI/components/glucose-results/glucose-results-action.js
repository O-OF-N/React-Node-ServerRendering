import * as Constants from '../../utils/constants';
import axios from 'axios';
import * as Records from '../../records/records';


export const fetchObservations = () => dispatch => {
    dispatch({
        type: Constants.OBSERVATIONS_FETCHING
    });
    axios.get(Constants.OBSERVATIONS_FETCH_URL, { headers: Constants.AUTHORIZATION_HEADER })
        .then((glucoseList) => {
            try {
                const data = (glucoseList && glucoseList.data) ? glucoseList.data : null;
                if (data) {
                    const ObservationList = data.map(glucose => new Records.Observation(glucose));
                    dispatch({ type: Constants.OBSERVATIONS_FETCHED, payLoad: ObservationList });
                } else
                    throw { message: "glucose list is not fetched" };
            } catch (err) {
                const errImmutable = err ? new Records.HttpError(err.message) : new Records.HttpError();
                dispatch({ type: Constants.OBSERVATIONS_ERROR, payLoad: errImmutable });
            }
        })
        .catch((err) => {
            const errImmutable = err ? new Records.HttpError(err) : new Records.HttpError();
            dispatch({ type: Constants.OBSERVATIONS_ERROR, payLoad: errImmutable });
        });

};