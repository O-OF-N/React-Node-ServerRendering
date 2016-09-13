"use strict";
import co from 'co';
import * as Constants from '../util/constants';
import * as httpService from '../service/http-service'
import * as Records from '../models/models';
import UserAuthenticationModel from '../models/UserAuthenticationSchema';
import {ActiveEnv, FHIRConfig} from '../config/app-config';

export const authorize = (iss, launch) =>
    co(getaAuthorizeURL.bind(this, iss, launch))
        .catch(console.log);

export const accessToken = (code, state) =>
    co(getAccessToken.bind(this, code, state))
        .catch(console.log);

const getAccessToken = function* (code, state) {
    const userAuthenticationModel = yield UserAuthenticationModel.find(state);
    console.log('here>>>>>>>>>>');
    console.log(userAuthenticationModel); 
    const requestBody = new Records.AccessTokenRequestBody({ code });
    const result = yield httpService.post(Constants.TOKEN_URL, requestBody, new Records.POSTHeader());
    return new Records.AccessToken({ patient: result.data.patient, accessToken: result.data.access_token })
};

const getaAuthorizeURL = function* (iss, launch) {
    const state = buildState(launch);
    const issURl = `${decodeURIComponent(iss)}/metadata`;
    const result = yield httpService.get(issURl, new Records.AuthorizationHeader());
    const authorizationURL = result.data.rest[0].security.extension[0].extension.filter(ext => ext.url === 'authorize')[0].valueUri;
    const tokenURL = result.data.rest[0].security.extension[0].extension.filter(ext => ext.url === 'token')[0].valueUri;
    const authModel = new Records.UserAuthentication({
        iss, state, authorizationURL, tokenURL
    })
    yield UserAuthenticationModel.save(authModel);
    const redirectUrl = authorizationURL +
        '?response_type=' + FHIRConfig.get(ActiveEnv).responseType +
        '&client_id=' + FHIRConfig.get(ActiveEnv).clientId +
        '&redirect_uri=' + FHIRConfig.get(ActiveEnv).redirectUrl +
        '&scope=' + FHIRConfig.get(ActiveEnv).scope +
        '&launch=' + launch +
        '&state=' + state +
        '&aud=' + iss;
    return redirectUrl;
};

const buildState = (launch) => `${launch}${Math.floor(Math.random() * 100000, 1)}${Date.now()}`;


