"use strict";
import co from 'co';
import * as Constants from '../util/constants';
import * as httpService from '../service/http-service'
import * as Records from '../models/models';
import UserAuthenticationModel from '../models/UserAuthenticationSchema';
import {ActiveEnv, FHIRConfig} from '../config/app-config';


//public methods
export const authorize = (iss, launch) => co(authorizeHelper.bind(this, iss, launch));

export const accessToken = (code, state) => co(accessTokenHelper.bind(this, code, state));


//private methods
const accessTokenHelper = function* (authorizationCode, state) {
    let patient, accessToken;
    const [userAuthenticationModel] = yield UserAuthenticationModel.findByState(state);
    console.log(userAuthenticationModel);
    const requestBody = new Records.AccessTokenRequestBody({ code: authorizationCode });
    const response = yield httpService.post(userAuthenticationModel.tokenURL, requestBody, new Records.POSTHeader());
    ({ patient } = response.data);
    accessToken = response.data.access_token;
    const updateResponse = yield UserAuthenticationModel.update(userAuthenticationModel._id, { authorizationCode, patient, accessToken });
    return state;
};

const authorizeHelper = function* (iss, launch) {
    let responseType, clientId, redirectUrl, scope;
    const state = buildState(launch);
    const issURl = `${decodeURIComponent(iss)}/metadata`;
    const response = yield httpService.get(issURl, new Records.AuthorizationHeader());
    const authorizationURL = response.data.rest[0].security.extension[0].extension.filter(ext => ext.url === 'authorize')[0].valueUri;
    const tokenURL = response.data.rest[0].security.extension[0].extension.filter(ext => ext.url === 'token')[0].valueUri;
    const authModel = new Records.UserAuthentication({
        iss, state, authorizationURL, tokenURL
    })
    yield UserAuthenticationModel.save(authModel);
};

const buildState = (launch) => `${launch}${Math.floor(Math.random() * 100000, 1)}${Date.now()}`;


