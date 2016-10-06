import * as Constants from './constants';

const buildObeservationURL = (patient, loincCodes,url) => {
    codes = lonicCodes.map(l=> Constants.LONIC_URL.concat(Constants.get(l))).join('/');
    return `${url}/${Constants.OBSERVATIONS}?patient=${patient}&code=${loincCodes}`;
};