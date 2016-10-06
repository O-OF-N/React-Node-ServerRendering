"use strict";

import * as Records from '../models/models';
import {List} from 'immutable';
import * as Constants from '../util/constants';
import {get} from '../service/http-service'

export const fetchGlucoseResults = function* () {
    const result = yield get(Constants.OBSERVATIONS_FETCH_URL,
            new Records.AuthorizationHeader());
    return checkResponseStatus(result) ? buildObservationFromJson(result) : null;
};

const checkResponseStatus = (json) => (json && json.status && json.status === 200) ? true : false;

const buildObservationFromJson = (json) => {
    let glucose = json.data.entry.map((entry) => {
        if (entry.resource.code.coding) {
            const [code] = entry.resource.code.coding;
            if (code.code == Constants.GLUCOSE_CODE) {
                return new Records.Observation({
                    date: entry.resource.issued,
                    quantity: entry.resource.valueQuantity.value,
                    interpretation: entry.resource.interpretation.coding[0].code
                });
            }
        }
    }).filter(entry => (entry) ? true : false);
    return List(glucose);
};
