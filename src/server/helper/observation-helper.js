"use strict";

import * as Records from '../models/models';
import {List} from 'immutable';
import * as Constants from '../util/constants';
import {get} from '../service/http-service'
import UserAuthenticationModel from '../models/UserAuthenticationSchema';
import * as UtilFunctions from '../util/util-functions';

export const fetchObservationResults = function* (state) {
    const [userAuthenticationModel] = yield UserAuthenticationModel.findByState(state);
    const Authorization = `Bearer ${userAuthenticationModel.accessToken}`;
    const header = new Records.AccessHeader({ Authorization });
    const url = UtilFunctions.buildObeservationURL(userAuthenticationModel.patient, ["glucose"], userAuthenticationModel.iss);
    const result = yield get(url, new Records.AuthorizationHeader({ headers: { Accept: "application/json+fhir", Authorization } }));
    return checkResponseStatus(result) ? buildObservationFromJson(result) : null;
};

const checkResponseStatus = (json) => (json && json.status && json.status === 200) ? true : false;

const buildObservationFromJson = (json) => {
    let glucose = json.data.entry.map((entry) => {
        if (entry && entry.resource) {
            const resource = entry.resource;
            return new Records.Observation({
                resource: (resource.code) ? resource.code.coding : null,
                date: resource.issued,
                quantity: resource.valueQuantity.value,
                interpretation: (resource.interpretation && resource.interpretation.coding) ? resource.interpretation.coding[0].code : null
            });
        }
    }).filter(entry => (entry) ? true : false);
    return List(glucose);
};
