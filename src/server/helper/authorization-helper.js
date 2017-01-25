"use strict";
import co from 'co';
import * as Constants from '../util/constants';
import * as httpService from '../service/http-service'
import * as Records from '../models/models';
import UserAuthenticationModel from '../models/UserAuthenticationSchema';
import { ActiveEnv, FHIRConfig } from '../config/app-config';
import util from 'util';

//public methods
export const authorize = (iss, launch) => co(authorizeHelper.bind(this, iss, launch));

export const accessToken = (code, state) => co(accessTokenHelper.bind(this, code, state));


//private methods
const accessTokenHelper = function* (authorizationCode, state) {
    let patient, accessToken;
    const [userAuthenticationModel] = yield UserAuthenticationModel.findByState(state);
    console.log('uam = ', userAuthenticationModel);
    if (!userAuthenticationModel.accessToken) {
        const requestBody = new Records.AccessTokenRequestBody({ code: authorizationCode });
        const response = yield httpService.post(userAuthenticationModel.tokenURL, requestBody, new Records.POSTHeader());
        ({ patient } = response.data);
        accessToken = response.data.access_token;
        yield UserAuthenticationModel.update(userAuthenticationModel._id,
            { authorizationCode, patient, accessToken });
    }
};

const authorizeHelper = function* (iss, launch) {
    const aud = iss;
    let response_type, client_id, redirect_uri, scope, params;
    ({ response_type, client_id, redirect_uri, scope } = FHIRConfig.get(ActiveEnv));
    const state = buildState(launch);
    const issURl = `${decodeURIComponent(iss)}/metadata`;
    const response = yield httpService.get(issURl, new Records.AuthorizationHeader());
    const extension = response.data.rest[0].security.extension[0].extension;
    const authorizationURL = extension.filter(ext => ext.url === 'authorize')[0].valueUri;
    const tokenURL = extension.filter(ext => ext.url === 'token')[0].valueUri;
    const authModel = new Records.UserAuthentication({
        iss, state, authorizationURL, tokenURL, launch
    });
    const model = yield UserAuthenticationModel.save(authModel);
    params = { response_type, client_id, redirect_uri, scope };
    util._extend(params, { launch, state, aud });
    const url = buildRedirectUrl(authorizationURL, params);
    return url;
};

const buildRedirectUrl = (authorizationURL, params) =>
    `${authorizationURL}?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`;

const buildState = (launch) => `${launch}${Math.floor(Math.random() * 100000, 1)}${Date.now()}`;


