"use strict";

import * as Records from '../models/models';
import { List } from 'immutable';
import * as Constants from '../util/constants';
import { get, all } from '../service/http-service'
import * as HttpUtil from '../util/http-utils';
import UserAuthenticationModel from '../models/UserAuthenticationSchema';
import * as Exceptions from '../util/exceptions'

//public functions
export const fetchMedications = function* (state) {
    const result = yield* fetchMedicationsHelper(state);
    const insulinOrders = buildInsulinOrdersResult(result);
    //return insulinOrders ? categorizeOrders(insulinOrders) : null;
    return insulinOrders ? yield* categorizeOrders(insulinOrders.push(...addTestMedications())) : null;
};

//Private functions
const fetchMedicationsHelper = function* (state) {
    const [userAuthenticationModel] = yield UserAuthenticationModel.findByState(state);
    console.log('userAuthenticationModel = ', userAuthenticationModel);
    if (!userAuthenticationModel) throw new Exceptions.InvalidStateError(`State ${state} is invalid`);
    console.log('userAuthenticationModel = ');
    const url = userAuthenticationModel ? HttpUtil.buildMedicationURL(userAuthenticationModel.patient, userAuthenticationModel.iss) : null;
    console.log('url = ', url);
    const authHeader = userAuthenticationModel ? HttpUtil.buildAuthorizationHeader(userAuthenticationModel) : null;
    let result;
    if (url && authHeader){
        console.log('it is here.......');
        result = yield get(url, authHeader)
    }
    else result = null;
    console.log('result = ', result);
    if (result && HttpUtil.checkResponseStatus(result)) return result;
    else throw new Exceptions.AuthenticationError('Authentication failed');
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

const fetchMedicationFromResource = (concept) => (concept) ? {
    name: concept.text, code: concept.coding ?
        concept.coding.filter(codes => codes.system === Constants.RXNORM_URL)[0].code : null
} : null;

const fetchMedicationAdministration = (dosage) => (dosage && dosage instanceof Array && dosage[0] && dosage[0].route &&
    dosage[0].route.coding && dosage[0].route.coding instanceof Array && dosage[0].route.coding[0]) ?
    dosage[0].route.coding[0].code === Constants.SUBCUTANEOUS ? Constants.SUBCUTANEOUS_TEXT : Constants.INTRAVENOUS_TEXT : null;


const categorizeOrders = function* (insulinOrders) {
    let medicationOrders = [];
    const insulinOrdersWithIngredients = yield* getIngredients(insulinOrders);
    Constants.ORDER_CATEGORIZATION.forEach((value, key) => {
        const medicationOrder = new Records.MedicationOrder({
            type: key, medications: new List(insulinOrdersWithIngredients.filter(order =>
                checkIngredients(value.code, order.ingredients.codes).length &&
                checkDosage(value, order)
            ))
        });
        medicationOrders.push(medicationOrder);
    });
    return medicationOrders;
};

const checkIngredients = (valueCodes, orderCodes) => valueCodes.filter(valueCode => {
    const vc = new List(valueCode);
    return vc.size === orderCodes.size && vc.contains(...orderCodes);
});

const checkDosage = (value, order) => (value.dosage && value.dosage === order.administration) || (!value.dosage);

const getIngredients = function* (insulinOrders) {
    try {
        const getFunctions = insulinOrders.map(insulinOrder => fetchHttpGetFn.bind(null, insulinOrder.code)).toJS();
        const ingredients = yield all(getFunctions);
        const processedIngredients = ingredients.map(ingredient => processIngredients(ingredient));
        return insulinOrders.map((insulinOrder, index) => insulinOrder.merge({ ingredients: processedIngredients[index] }));
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const fetchHttpGetFn = (code) => get(`https://rxnav.nlm.nih.gov/REST/rxcui/${code}/related?tty=IN+SBDC`);

const processIngredients = rxNormData => {
    const ingredientsList = rxNormData.data.relatedGroup.conceptGroup.filter(group => group.tty === 'IN');
    const sbdcList = rxNormData.data.relatedGroup.conceptGroup.filter(group => group.tty === 'SBDC');
    const response = ingredientsList && sbdcList && ingredientsList instanceof Array && sbdcList instanceof Array &&
        ingredientsList.length > 0 && sbdcList.length > 0 && ingredientsList[0] && sbdcList[0] && sbdcList[0].conceptProperties &&
        sbdcList[0].conceptProperties instanceof Array && sbdcList[0].conceptProperties.length > 0 ?
        { ingredients: ingredientsList[0], sbdcName: sbdcList[0].conceptProperties[0].name } : null;
    const ingredients = response && response.ingredients && response.ingredients.conceptProperties ?
        response.ingredients.conceptProperties.map(conceptProperty => {
            const code = { code: parseInt(conceptProperty.rxcui), name: conceptProperty.name };
            return code;
        }) : null;
    return ingredients ? ingredients.length === 1 ? new Records.Ingredients({ codes: List([ingredients[0].code]), name: ingredients[0].name }) :
        new Records.Ingredients({ codes: List(ingredients.map(ingredient => ingredient.code)), name: response.sbdcName }) : null;
};

const addTestMedications = () => {
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
    const bolus3 = new Records.InsulinOrder({
        status: 'active',
        date: new Date(),
        dosage: '10 unit(s), Subcutaneous, BID',
        medication: 'HumaLOG Mix 75/25',
        administration: Constants.SUBCUTANEOUS_TEXT,
        code: 259111,
        comments: '1 unit, Injection, Subcutaneously,WM,Routine,Start Date 02/11/2016 8:00. Please give NovoLOG with lunch and dinner'
    });
    return new List([bolus1, bolus2, bolus3]);
};
