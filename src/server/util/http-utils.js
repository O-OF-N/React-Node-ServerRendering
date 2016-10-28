import * as Constants from './constants';
import * as Records from '../models/models';

export const buildAuthorizationHeader = (userModel) => {
    const Authorization = `Bearer ${userModel.accessToken}`;
    return new Records.AuthorizationHeader({ headers: { Accept: "application/json+fhir", Authorization } });
}

export const checkResponseStatus = (json) => (json && json.status && json.status === Constants.HTTP_SUCCESS) ? true : false;

export const buildObeservationURL = (patient, lonicCodes, url,dates) => {
    const codes = lonicCodes.map(l => Constants.LONIC_URL.concat(Constants.LONIC_CODES.get(l))).join(',');
    let dateRange = '';
    let urlConstructed = '';
    console.log(dates);
   // console.log(dates.length);
   // console.log(dates instanceof Array);
    if(dates!= null){
        dateRange.concat('date=gt').concat(dates[0]).concat('&date=lt').concat(dates[1]);
        urlConstructed= `${url}/${Constants.OBSERVATIONS}?patient=${4478007}&code=${codes}&${dateRange}`;
    }
    urlConstructed= `${url}/${Constants.OBSERVATIONS}?patient=${4478007}&code=${codes}`;
    console.log('>>>>>url constr = ' + urlConstructed);
    return urlConstructed;
};

export const buildMedicationURL = (patient, url) => `${url}/${Constants.MEDICATION_ORDER}?patient=${4478007}`;