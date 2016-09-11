import {Record} from 'immutable';
import * as Constants from '../util/constants';

export const Observation = new Record({
    date: '',
    quantity: 0,
    interpretation: ''
});


export const AccessTokenBody = new Record({
    grant_type: Constants.GRANT_TYPE,
    code: '',
    redirect_uri: Constants.REDIRECT_URL,
    client_id: Constants.CLIENT_ID
});

export const AuthorizationHeader = new Record({
    headers: Constants.AUTHORIZATION_HEADER
});

export const POSTHeader = new Record({
    "content-type": "x-www-form-urlencoded"
})