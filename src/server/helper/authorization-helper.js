"use strict";
import co from 'co';
import * as Constants from '../util/constants';
import * as ServerCall from '../service/http-service'
import * as Records from '../models/models';
import {ActiveEnv,FHIRConfig} from '../config/app-config';

export const authorize = (iss, launch) =>
    co(getaAuthorizeURL.bind(this, iss, launch))
        .catch(console.log);

export const accessToken = (code) =>
    co(getAccessToken.bind(this, code))
        .catch(console.log);

const getAccessToken = function* (code) {
    const requestBody = new Records.AccessTokenRequestBody({ code });
    const result = yield ServerCall.post(Constants.TOKEN_URL, requestBody, new Records.POSTHeader());
    return new Records.AccessToken({ patient: result.data.patient, accessToken: result.data.access_token })
};

const getaAuthorizeURL = function* (iss, launch) {
    const issURl = `${decodeURIComponent(iss)}/metadata`;
    const result = yield ServerCall.get(issURl, new Records.AuthorizationHeader());
    const authorizeURL = result.data.rest[0].security.extension[0].extension.filter(ext => ext.url === 'authorize')[0].valueUri;
    const redirectUrl = authorizeURL +
        '?response_type=' + FHIRConfig.get(ActiveEnv).responseType +
        '&client_id=' + FHIRConfig.get(ActiveEnv).clientId +
        '&redirect_uri=' + FHIRConfig.get(ActiveEnv).redirectUrl +
        '&scope=' + FHIRConfig.get(ActiveEnv).scope +
        '&launch=' + launch +
        '&state=98wrghuwuogerg97&aud=' + iss;
    return redirectUrl;
};


