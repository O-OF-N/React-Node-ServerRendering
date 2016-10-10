"use strict";

import * as Records from '../models/models';
import {List} from 'immutable';
import * as Constants from '../util/constants';
import {get} from '../service/http-service'
import * as HttpUtil from '../util/http-utils';
import UserAuthenticationModel from '../models/UserAuthenticationSchema';

//Public functions
export const fetchGlucoseResults = function* (state) {
    const result = yield* fetchObservationResultsHelper(state, ["glucose"]);
    return checkResponseStatus(result) ? buildGlucoseResultsFromJson(result) : null;
};

export const fetchLabResults = function* (state) {
    const result = yield* fetchObservationResultsHelper(state, ["ketones","ph","serum"]);
    return checkResponseStatus(result) ? buildLabResultsFromJson(result) : null;
};


//Private functions


const fetchObservationResultsHelper = function* (state, lonicCodes) {
    const [userAuthenticationModel] = yield UserAuthenticationModel.findByState(state);
    const url = HttpUtil.buildObeservationURL(userAuthenticationModel.patient, lonicCodes, userAuthenticationModel.iss);
    const authHeader = HttpUtil.buildAuthorizationHeader(userAuthenticationModel);
    const result = yield get(url, authHeader);
    return result;
};

const checkResponseStatus = (json) => (json && json.status && json.status === 200) ? true : false;

const buildGlucoseResultsFromJson = (json) => {
    let glucose = (json.data && json.data.entry)?json.data.entry.map((entry) => {
        if (entry && entry.resource) {
            const resource = entry.resource;
            return new Records.Glucose({
                resource: (resource.code) ? resource.code.coding : null,
                date: resource.issued,
                quantity: resource.valueQuantity.value,
                interpretation: (resource.interpretation && resource.interpretation.coding) ? resource.interpretation.coding[0].code : null
            });
        }
    }).filter(entry => (entry) ? true : false):null;
    return List(glucose);
};

const buildLabResultsFromJson = (json) => {
    let lab = json.data.entry.map((entry) => {
        if (entry && entry.resource) {
            const resource = entry.resource;
            console.log(resource);
        }
    }).filter(entry => (entry) ? true : false);
    return List(glucose);
}
