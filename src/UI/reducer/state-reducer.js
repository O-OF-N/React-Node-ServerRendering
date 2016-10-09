import * as Records from '../records/records';
import * as Constants from '../utils/constants';

const init = new Records.ServerState({});

const reducer = (serverState = init, action) => {
    switch (action.type) {
        case Constants.SET_SERVER_STATE:
            const payLoad = !action.payLoad ? '' : action.payLoad;
            return serverState.merge({ state: payLoad });
        default:
            return serverState;
    }
};
export default reducer;