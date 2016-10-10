import * as Constants from '../../utils/constants';
import axios from 'axios';
import * as Records from '../../records/records';
import co from 'co';


export const fetchLabs = state => dispatch => {
    co(fetchLabsHelper.bind(null, state, dispatch))
        .catch((err) => {
            const errImmutable = err ? new Records.HttpError(err) : new Records.HttpError();
            dispatch({ type: Constants.LAB_ERROR, payLoad: errImmutable });
        });

};

const fetchLabsHelper = function* (state, dispatch) {
    dispatch({ type: Constants.LAB_FETCHING });
    const labList = yield axios.get(Constants.LAB_FETCH_URL.concat(`/${state.state}`), { headers: Constants.AUTHORIZATION_HEADER });
    try {
        const data = (labList && labList.data) ? labList.data : null;
        if (data) {
            const labObj = data.map(lab => new Records.Lab(lab));
            dispatch({ type: Constants.LAB_FETCHED, payLoad: labObj });
        } else
            throw { message: "lab list is not fetched" };
    } catch (err) {
        const errImmutable = err ? new Records.HttpError(err.message) : new Records.HttpError();
        dispatch({ type: Constants.LAB_ERROR, payLoad: errImmutable });
    }
};