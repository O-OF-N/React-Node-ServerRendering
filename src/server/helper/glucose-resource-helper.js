"use strict";

import * as Records from '../models/models';
import {List} from 'immutable';
import * as Constants from '../util/constants';

export const fetchGlucoseResults = (json)=>{
    return checkResponseStatus(json)?buildObservationFromJson(json): null;
};

const checkResponseStatus = (json) => (json && json.status && json.status === 200)? true:false;

const buildObservationFromJson = (json) =>{
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
