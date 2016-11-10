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
    return insulinOrders ? yield* categorizeOrders(insulinOrders.push(...bolusMedications())) : null;
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


const categorizeOrders = function* (insulinOrders) {
    let medicationOrders = [];
    const insulinOrdersWithIngredients = yield* getIngredients(insulinOrders);
    console.log(insulinOrdersWithIngredients);
    Constants.ORDER_CATEGORIZATION.forEach((value, key) => {

        const medicationOrder = new Records.MedicationOrder({
            type: key, medications: new List(insulinOrdersWithIngredients.filter(order => {
                console.log(key, value.code.length, order.ingredients.codes.size);
                console.log('value.code=', value.code);
                console.log('order.ingredients.codes=', order.ingredients.codes);
                console.log('value.dosage=', value.dosage);
                console.log('order.administration=', order.administration);

                return value.code.length === order.ingredients.codes.size && value.code.includes(...order.ingredients.codes) && ((value.dosage && value.dosage === order.administration) || (!value.dosage))
            }))
        });
        medicationOrders.push(medicationOrder);
    });
    console.log(medicationOrders);
    return medicationOrders;
};

const getIngredients = function* (insulinOrders) {
    try {
        const getFunctions = insulinOrders.map(insulinOrder => axiosGet.bind(null, insulinOrder.code)).toJS();
        const ingredients = yield axios.all(getFunctions.map(fn => fn()));
        const processedIngredients = ingredients.map(ingredient => processIngredients(ingredient));
        return insulinOrders.map((insulinOrder, index) => insulinOrder.merge({ ingredients: processedIngredients[index] }));
    } catch (err) {
        console.log(err);
    }
};

const axiosGet = (code) => axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${code}/related?tty=IN+SBDC`);

const processIngredients = rxNormData => {
    const ingredientsList = rxNormData.data.relatedGroup.conceptGroup.filter(group => group.tty === 'IN');
    const sbdcList = rxNormData.data.relatedGroup.conceptGroup.filter(group => group.tty === 'SBDC');
    const response = ingredientsList && sbdcList && ingredientsList instanceof Array && sbdcList instanceof Array && ingredientsList.length > 0 && sbdcList.length > 0 && ingredientsList[0] && sbdcList[0] && sbdcList[0].conceptProperties && sbdcList[0].conceptProperties instanceof Array && sbdcList[0].conceptProperties.length > 0 ? { ingredients: ingredientsList[0], sbdcName: sbdcList[0].conceptProperties[0].name } : null;
    const ingredients = response && response.ingredients && response.ingredients.conceptProperties ? response.ingredients.conceptProperties.map(conceptProperty => {
        const code = { code: conceptProperty.rxcui, name: conceptProperty.name };
        return code;
    }) : null;
    return ingredients ? ingredients.length === 1 ? new Records.Ingredients({ codes: [ingredients[0].code], name: ingredients[0].name }) :
        new Records.Ingredients({ codes: ingredients.map(ingredient => ingredient.code), name: response.sbdcName }) : null;
};
