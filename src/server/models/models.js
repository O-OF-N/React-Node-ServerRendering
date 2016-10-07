import {Record} from 'immutable';
import * as Constants from '../util/constants';
import {ActiveEnv,FHIRConfig} from '../config/app-config';

export const Observation = new Record({
    resource: '',
    date: '',
    quantity: 0,
    interpretation: ''
});

export const AccessTokenRequestBody = new Record({
    grant_type: FHIRConfig.get(ActiveEnv).grant_type,
    code: '',
    redirect_uri: FHIRConfig.get(ActiveEnv).redirect_uri,
    client_id: FHIRConfig.get(ActiveEnv).client_id
});

export const AuthorizationHeader = new Record({
    headers: Constants.AUTHORIZATION_HEADER
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