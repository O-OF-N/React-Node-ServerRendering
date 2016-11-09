"use strict";

import * as Records from '../models/models';
import { List } from 'immutable';
import * as Constants from '../util/constants';
import { get } from '../service/http-service'
import * as HttpUtil from '../util/http-utils';
import UserAuthenticationModel from '../models/UserAuthenticationSchema';


import axios from 'axios';
import co from 'co';
//public functions
export const fetchMedications = function* (state) {
    const result = yield* fetchMedicationsHelper(state);
    const insulinOrders = HttpUtil.checkResponseStatus(result) ? buildInsulinOrdersResult(result) : null;
    //return insulinOrders ? categorizeOrders(insulinOrders) : null;
    return insulinOrders ? categorizeOrders(insulinOrders.push(...bolusMedications())) : null;
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
            insulin = (medication) ? new Records.InsulinOrder({
                status,
                date: dateWritten,
                dosage: (dosageInstruction && dosageInstruction instanceof Array && dosageInstruction[0]) ? dosageInstruction[0].text : null,
                medication: medication.name,
                administration: fetchMedicationAdministration(dosageInstruction),
                code: parseInt(medication.code),
                comments: (dosageInstruction && dosageInstruction instanceof Array && dosageInstruction[0]) ? dosageInstruction[0].additionalInstructions : null
            }) : null;
        };
        return insulin;
    }).filter(entry => (entry) ? true : false) : null;
    return List(insulinOrder);
};

const bolusMedications = () => {
    const bolus1 = new Records.InsulinOrder({
        status: 'active',
        date: new Date(),
        dosage: '10 unit(s), Subcutaneous, BID',
        medication: 'Regular Insulin, Human 100 UNT/ML [HumuLIN R]',
        administration: Constants.SUBCUTANEOUS_TEXT,
        code: 575148,
        comments: '2 units, Injection, Subcutaneously,Bedtime,Routine,Start Date 02/11/2016 8:00.'
    });
    const bolus2 = new Records.InsulinOrder({
        status: 'active',
        date: new Date(),
        dosage: '10 unit(s), Subcutaneous, BID',
        medication: 'Insulin, Aspart, Human 100 UNT/ML [NovoLOG]',
        administration: Constants.SUBCUTANEOUS_TEXT,
        code: 575679,
        comments: '1 unit, Injection, Subcutaneously,WM,Routine,Start Date 02/11/2016 8:00. Please give NovoLOG with lunch and dinner'
    });
    return new List([bolus1, bolus2]);
}

const fetchMedicationFromResource = (concept) => (concept) ? { name: concept.text, code: concept.coding ? concept.coding.filter(codes => codes.system === Constants.RXNORM_URL)[0].code : null } : null;

const fetchMedicationAdministration = (dosage) => (dosage && dosage instanceof Array && dosage[0] && dosage[0].route && dosage[0].route.coding && dosage[0].route.coding instanceof Array && dosage[0].route.coding[0]) ? dosage[0].route.coding[0].code === Constants.SUBCUTANEOUS ? Constants.SUBCUTANEOUS_TEXT : Constants.INTRAVENOUS_TEXT : null;

const categorizeOrders = (insulinOrders) => {
    let medicationOrders = [];
    getAndMapRxNormIngredients(insulinOrders);
    Constants.ORDER_CATEGORIZATION.forEach((value, key) => {
        const medicationOrder = new Records.MedicationOrder({ type: key, medications: new List(insulinOrders.filter(order => value.code.includes(order.code) && ((value.dosage && value.dosage === order.administration) || (!value.dosage)))) });
        medicationOrders.push(medicationOrder);
    });
    return medicationOrders;
};

const getAndMapRxNormIngredients = insulinOrders => {
    const insulin = insulinOrders.map(insulinOrder => getRxNormIngredientsMapper(insulinOrder));
    console.log('medication insulin = ' + insulin);
};

const getRxNormIngredientsMapper = insulinOrder => {
    co(getRxNormIngredients.bind(null, insulinOrder))
    .then(res=>{return res;})
    .catch(console.log);
};

const getRxNormIngredients = function* (rxNormCode) {
    const rxnormdata = yield axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxNormCode.code}/related?tty=IN+SBDC`);
    const ingredientCodes = processIngredients(rxnormdata);
    //Constants.BOLUS;
    return ingredientCodes;
};

const processIngredients = rxNormData => {
    const ingredientsList = rxNormData.data.relatedGroup.conceptGroup.filter(group => group.tty === 'IN');
    const sbdcList = rxNormData.data.relatedGroup.conceptGroup.filter(group => group.tty === 'SBDC');
    const response = ingredientsList && sbdcList && ingredientsList instanceof Array && sbdcList instanceof Array && ingredientsList.length > 0 && sbdcList.length > 0 && ingredientsList[0] && sbdcList[0] && sbdcList[0].conceptProperties && sbdcList[0].conceptProperties instanceof Array && sbdcList[0].conceptProperties.length > 0 ? { ingredients: ingredientsList[0], sbdcName: sbdcList[0].conceptProperties[0].name } : null;
    const ingredients = response ? response.ingredients.conceptProperties.map(conceptProperty => {
        const code = { code: conceptProperty.rxcui, name: conceptProperty.name };
        return code;
    }) : null;
    const sbdcName = response ? response.sbdcName : null;
    return { ingredients, sbdcName };
};
