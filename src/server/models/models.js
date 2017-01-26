import { Record, List as immutableList } from 'immutable';
import * as Constants from '../util/constants';
import { ActiveEnv, FHIRConfig } from '../config/app-config';

export const Observation = new Record({
    resource: '',
    text: '',
    date: '',
    quantity: 0,
    unit: '',
    interpretation: '',
    source: ''
});

export const Authentication = new Record({
    authenticated: true,
    iss:'',
    launch:'',
    state:'',
    hacker:false
});

export const LabResult = new Record({
    code: '',
    observation: null
});

export const InsulinOrder = new Record({
    status: '',
    date: '',
    dosage: 0,
    medication: '',
    comments: '',
    administration: '',
    code: 0,
    ingredients: null
});

export const Ingredients = new Record({
    codes: immutableList(),
    name: ''
});

export const MedicationOrder = new Record({
    type: '',
    medications: immutableList()
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
    patient: 0,
    launch: ''
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