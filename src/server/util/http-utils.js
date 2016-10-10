import * as Constants from './constants';
import * as Records from '../models/models';

export const buildAuthorizationHeader = (userModel) => {
    const Authorization = `Bearer ${userModel.accessToken}`;
    return new Records.AuthorizationHeader({ headers: { Accept: "application/json+fhir", Authorization } });
}

export const buildObeservationURL = (patient, lonicCodes, url) => {
    const codes = lonicCodes.map(l => Constants.LONIC_URL.concat(Constants.LONIC_CODES.get(l))).join(',');
     return `${url}/${Constants.OBSERVATIONS}?patient=${4478007}&code=${codes}`;
};