import {OrderedMap} from 'immutable';

const devDatabase = {
    userName: 'bear',
    password: 'bear4kids',
    url: 'ds029496.mlab.com:29496',
    schema: 'diabetesdashboard'
};

const devFhirAuth = {
    clientId: '707ffe10-83ee-42f2-b2e8-1871ad0c1a4c',
    redirectUrl: 'https://diabetesdashboard.herokuapp.com/callback',
    scope: 'launch+user%2FObservation.read',
    responseType: 'code',
    grantType: 'authorization_code'
};


export const DBConfig = new OrderedMap({
    development: devDatabase
});

export const FHIRConfig = new OrderedMap({
    development: devFhirAuth
});

const env = {
    dev: "development"
}

export const ActiveEnv = env.dev;