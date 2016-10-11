"use strict";

import * as Records from '../models/models';
import {List} from 'immutable';
import * as Constants from '../util/constants';
import {get} from '../service/http-service'
import * as HttpUtil from '../util/http-utils';
import UserAuthenticationModel from '../models/UserAuthenticationSchema';

//public functions
export const fetchMedications = function* (state) {
    const result = yield* fetchMedicationsHelper(state);
    return HttpUtil.checkResponseStatus(result) ? buildMedicationOrdersResult(result) : null;
};

//Private functions
const fetchMedicationsHelper = function* (state) {
    const [userAuthenticationModel] = yield UserAuthenticationModel.findByState(state);
    const url = HttpUtil.buildMedicationURL(userAuthenticationModel.patient, userAuthenticationModel.iss);
    const authHeader = HttpUtil.buildAuthorizationHeader(userAuthenticationModel);
    const result = yield get(url, authHeader);
    return result;
};


const buildMedicationOrdersResult = (json) => {
    let medicationOrder = (json.data && json.data.entry) ? json.data.entry.map((entry) => {
        if (entry && entry.resource) {
            const resource = entry.resource;
            return new Records.MedicationOrder({
                status: (resource.status),
                prescriber: (resource.prescriber) ? resource.prescriber.display : null,
                date: resource.dateWritten,
                dosage: (resource.dosageInstruction) ? resource.dosageInstruction[0].text : null,
                medication: fetchMedicationFromResource(resource)
            });
        }
    }).filter(entry => (entry) ? true : false) : null;
    return List(medicationOrder);
};

const fetchMedicationFromResource = (resource) => resource ? resource.medicationReference ? resource.medicationReference.display : resource.medicationCodeableConcept ? resource.medicationCodeableConcept.text : null : null;