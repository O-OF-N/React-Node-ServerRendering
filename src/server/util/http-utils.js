import * as Constants from './constants';
import * as Records from '../models/models';

export const buildAuthorizationHeader = (userModel) => {
    const Authorization = `Bearer ${userModel.accessToken}`;
    return new Records.AuthorizationHeader({ headers: { Accept: "application/json+fhir", Authorization } });
}

export const checkResponseStatus = (json) => (json && json.status && json.status === Constants.HTTP_SUCCESS) ? true : false;

export const buildObeservationURL = (patient, lonicCodes, url,dates) => {
    const codes = lonicCodes.map(l => Constants.LONIC_URL.concat('|').concat(Constants.LONIC_CODES.get(l))).join(',');
    let urlConstructed = '';
    if(dates!= null && dates instanceof Array && dates.length==2){
        const dateRange = ''.concat('date=gt').concat(dates[0]).concat('&date=lt').concat(dates[1]);
        urlConstructed= `${url}/${Constants.OBSERVATIONS}?patient=${4638007}&code=${codes}&${dateRange}`;
    } else 
    urlConstructed= `${url}/${Constants.OBSERVATIONS}?patient=${4638007}&code=${codes}`;
    return urlConstructed;
};

export const buildMedicationURL = (patient, url) => `${url}/${Constants.MEDICATION_ORDER}?patient=${4638007}`;