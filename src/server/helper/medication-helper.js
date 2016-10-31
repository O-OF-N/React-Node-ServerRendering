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
    console.log(result);
    return HttpUtil.checkResponseStatus(result) ? buildInsulinOrdersResult(result) : null;
};

//Private functions
const fetchMedicationsHelper = function* (state) {
    const [userAuthenticationModel] = yield UserAuthenticationModel.findByState(state);
    const url = HttpUtil.buildMedicationURL(userAuthenticationModel.patient, userAuthenticationModel.iss);
    const authHeader = HttpUtil.buildAuthorizationHeader(userAuthenticationModel);
    console.log(url)
    const result = yield get(url, authHeader);
    return result;
};


const buildInsulinOrdersResult = (json) => {
    let insulinOrder = (json.data && json.data.entry) ? json.data.entry.map((entry) => {
        let insulin = null;
        let status, prescriber, dateWritten, dosageInstruction, medicationReference, medicationCodeableConcept;
        if (entry && entry.resource) {
            const resource = entry.resource;
            ({ status, prescriber, dateWritten, dosageInstruction, medicationCodeableConcept } = resource);
            const medication  = fetchMedicationFromResource(medicationCodeableConcept);
            insulin = (medication) ? new Records.InsulinOrder({
                status,
                prescriber: (prescriber) ? prescriber.display : null,
                date: dateWritten,
                dosage: (dosageInstruction && dosageInstruction instanceof array && dosageInstruction[0]) ? dosageInstruction[0].text : null,
                medication,
                administration: fetchMedicationAdministration(dosageInstruction)
            }) : null;
        };
        return insulin;
    }).filter(entry => (entry) ? true : false) : null;
    return List(insulinOrder);
};

const fetchMedicationFromResource = (concept) => (concept) ? concept.text : null;

const fetchMedicationAdministration = (dosage) => (dosage && dosage instanceof array && dosage[0] && dosage[0].route && dosage[0].route.coding && dosage[0].route.coding instanceof array && dosage[0].route.coding[0]) ? dosage[0].route.coding[0].code === Constants.SUBCUTANEOUS ? Constants.SUBCUTANEOUS_TEXT : Constants.INTRAVENOUS_TEXT : null;

const array = (()=>[].constructor)()