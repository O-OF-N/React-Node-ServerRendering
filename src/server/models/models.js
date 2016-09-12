import {Record} from 'immutable';
import * as Constants from '../util/constants';
import {ActiveEnv,FHIRConfig} from '../config/app-config';

export const Observation = new Record({
    date: '',
    quantity: 0,
    interpretation: ''
});

export const AccessToken = new Record({
    patient: 0,
    accessToken: ''
});

export const AccessTokenRequestBody = new Record({
    grant_type: FHIRConfig.get(ActiveEnv).grantType,
    code: '',
    redirect_uri: FHIRConfig.get(ActiveEnv).redirectUrl,
    client_id: FHIRConfig.get(ActiveEnv).clientId
});

export const AuthorizationHeader = new Record({
    headers: Constants.AUTHORIZATION_HEADER
});

export const POSTHeader = new Record({
    "Content-Type": "x-www-form-urlencoded"
});

export const UserAuthentication = new Record({
    state: '',
    iss: '',
    authorizationCode: '',
    accessToken: '',
    authorizationURL: '',
    tokenURL: '',
    patient: 0
});

export const DatabaseConfig = new Record({
    userName: '',
    password: '',
    url: '',
    schema: ''
});

export const FHIRAuthorizationConfig = new Record({
    clientId: '',
    redirectUrl: '',
    responseType: 'code',
    scope: ''
});