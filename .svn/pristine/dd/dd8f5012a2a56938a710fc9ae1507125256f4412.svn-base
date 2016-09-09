"use strict";
import co from 'co';
import * as Constants from '../util/constants';
import * as ServerCall from '../service/fhir-resource-service'

export const authorize = (iss, launch) =>
    co(authorizeURL.bind(this, iss, launch))
        .catch(console.log);

const authorizeURL = function* (iss, launch) {
    const issURl = `${decodeURIComponent(iss)}/metadata`;
    const result = yield ServerCall.callUrl(issURl);
    const authorizeURL = result.data.rest[0].security.extension[0].extension.filter(ext => ext.url === 'authorize')[0].valueUri;
    const redirectUrl = authorizeURL +
        '?response_type=' + Constants.RESPONSE_TYPE +
        '&client_id=' + Constants.CLIENT_ID +
        '&redirect_uri=' + Constants.REDIRECT_URL +
        '&launch=' + launch +
        '&scope=' + Constants.SCOPE +
        '&state=98wrghuwuogerg97&aud=' + iss;
    return redirectUrl;
};