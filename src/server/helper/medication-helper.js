"use strict";

import * as Records from '../models/models';
import { List } from 'immutable';
import * as Constants from '../util/constants';
import { get } from '../service/http-service'
import * as HttpUtil from '../util/http-utils';
import UserAuthenticationModel from '../models/UserAuthenticationSchema';

//public functions
export const fetchMedications = function* (state) {
    const result = yield* fetchMedicationsHelper(state);
    const insulinOrders = HttpUtil.checkResponseStatus(result) ? buildInsulinOrdersResult(result) : null;
    return insulinOrders ? categorizeOrders(insulinOrders) : null;
};

//Private functions
const fetchMedicationsHelper = function* (state) {
    const [userAuthenticationModel] = yield UserAuthenticationModel.findByState(state);
    const url = HttpUtil.buildMedicationURL(userAuthenticationModel.patient, userAuthenticationModel.iss);
    const authHeader = HttpUtil.buildAuthorizationHeader(userAuthenticationModel);
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
            const medication = fetchMedicationFromResource(medicationCodeableConcept);
            console.log(medication);
            insulin = (medication) ? new Records.InsulinOrder({
                status,
                date: dateWritten,
                dosage: (dosageInstruction && dosageInstruction instanceof Array && dosageInstruction[0]) ? dosageInstruction[0].text : null,
                medication: medication.name,
                administration: fetchMedicationAdministration(dosageInstruction),
                code: parseInt(medication.code)
            }) : null;
        };
        return insulin;
    }).filter(entry => (entry) ? true : false) : null;
    console.log(insulinOrder);
    return List(insulinOrder);
};

const fetchMedicationFromResource = (concept) => (concept) ? { name: concept.text, code: concept.coding ? concept.coding.filter(codes => codes.system === Constants.RXNORM_URL)[0].code : null } : null;

const fetchMedicationAdministration = (dosage) => (dosage && dosage instanceof Array && dosage[0] && dosage[0].route && dosage[0].route.coding && dosage[0].route.coding instanceof Array && dosage[0].route.coding[0]) ? dosage[0].route.coding[0].code === Constants.SUBCUTANEOUS ? Constants.SUBCUTANEOUS_TEXT : Constants.INTRAVENOUS_TEXT : null;

const categorizeOrders = (insulinOrders) => {
    console.log(insulinOrders)
    let medicationOrders = [];
    Constants.ORDER_CATEGORIZATION.forEach((value, key) => {
        const medicationOrder = new medicationOrder({type: key, medications: new immutableList(insulinOrders.filter(order => value.code.includes(order.code) && ((value.dosage && value.dosage === order.administration) || (!value.dosage))))});
        medicationOrders.push(medicationOrder);
    });
    return medicationOrders;
};

//const array = (() => [].constructor)()