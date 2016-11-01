"use strict";

import * as Records from '../models/models';
import { List, Map as immutableMap } from 'immutable';
import * as Constants from '../util/constants';
import { get } from '../service/http-service'
import * as HttpUtil from '../util/http-utils';
import UserAuthenticationModel from '../models/UserAuthenticationSchema';

//Public functions
export const fetchGlucoseResults = function* (state) {
    const result = yield* fetchObservationResultsHelper(state, Constants.GLUCOSE_CODES, new Date(), 24);
    //const result = yield* fetchObservationResultsHelper(state, Constants.GLUCOSE_CODES);
    return HttpUtil.checkResponseStatus(result) ? buildGlucoseResultsFromJson(result) : null;
};

export const fetchLabResults = function* (state) {
    /*const result = yield* fetchObservationResultsHelper(state, Constants.LABS_LOINIC_CODES, new Date(), 24);*/
    const result = yield* fetchObservationResultsHelper(state, Constants.LABS_LOINIC_CODES);
    const labs = HttpUtil.checkResponseStatus(result) ? buildLabResultsFromJson(result) : null;
    return groupLabs(Constants.LABS_LOINIC_CODES, labs);
};


//Private functions
const fetchObservationResultsHelper = function* (state, lonicCodes, date = null, duration = 0) {
    const [userAuthenticationModel] = yield UserAuthenticationModel.findByState(state);
    const url = HttpUtil.buildObeservationURL(userAuthenticationModel.patient, lonicCodes, userAuthenticationModel.iss, getDateRange(date, duration));
    const authHeader = HttpUtil.buildAuthorizationHeader(userAuthenticationModel);
    const result = yield get(url, authHeader);
    return result;
};

const groupLabs = (loincCodes, results) => loincCodes.map(lc => buildResultLoincMap(Constants.LONIC_CODES.get(lc), results)).filter(r => r.observation.size).sort(r=>r.date);

const buildResultLoincMap = (code, results) => new Records.LabResult({ code: code, observation: results.filter(r => r.resource === code).slice(0, Constants.LAB_RESULT_COUNT) });

const getDateRange = (date, duration) => {
    if (date && duration) {
        const today = new Date(date);
        const yesterday = new Date(today);
        yesterday.setHours(today.getHours() - 24);
        return [new Date(yesterday).toISOString(), today.toISOString()];
    }
    return null;
};

const buildGlucoseResultsFromJson = (json) => {
    let glucose = (json.data && json.data.entry) ? json.data.entry.map((entry) => {
        if (entry && entry.resource) {
            const resource = entry.resource;
            return buildObservationFromResource(resource);
        }
    }).filter(entry => (entry) ? true : false).sort(compare) : null;
    return List(glucose);
};

const buildLabResultsFromJson = (json) => {
    let lab = (json.data && json.data.entry) ? json.data.entry.map((entry) => {
        if (entry && entry.resource) {
            const resource = entry.resource;
            return buildObservationFromResource(resource);
        }
    }).filter(entry => (entry) ? true : false) : null;
    return List(lab);
};

const buildObservationFromResource = (resource) => new Records.Observation({
    resource: (resource.code && resource.code.coding) ? resource.code.coding.filter(code => code.system === Constants.LONIC_URL)[0]['code'] : null,
    text: (resource.code) ? resource.code.text : null,
    date: resource.issued,
    quantity: resource.valueQuantity && resource.valueQuantity.value ? resource.valueQuantity.value : null,
    unit: resource.valueQuantity && resource.valueQuantity.unit ? resource.valueQuantity.unit : null,
    interpretation: (resource.interpretation && resource.interpretation.coding) ? resource.interpretation.coding[0].code : null
});

const compare = (r1, r2) => (r1 && r2) ? r1.text.toLowerCase() > r2.text.toLowerCase() ? 1 : r2.text.toLowerCase() > r1.text.toLowerCase() ? -1 : r1.date > r2.date ? 1 : -1 : 0;