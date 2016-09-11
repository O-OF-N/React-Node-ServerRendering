"use strict";
import co from 'co';
import * as Constants from '../util/constants';
import * as ServerCall from '../service/http-service'
import * as Records from '../models/models';
export const authorize = (iss, launch) =>
    co(getaAuthorizeURL.bind(this, iss, launch))
        .catch(console.log);

export const accessToken = (code) =>
    co(getAccessToken.bind(this, code))
        .catch(console.log);

const getAccessToken = function* (code) {
    const requestBody = new Records.AccessTokenBody({code});
    const result = yield ServerCall.post(Constants.TOKEN_URL,requestBody,new Records.POSTHeader());
    console.log(result.patient);
    console.log(result.access_token);
};

const getaAuthorizeURL = function* (iss, launch) {
    const issURl = `${decodeURIComponent(iss)}/metadata`;
    const result = yield ServerCall.get(issURl, new Records.AuthorizationHeader());
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


