"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var DOMAIN = exports.DOMAIN = "https://fhir-open.sandboxcernerpowerchart.com/may2015";
var TENANT = exports.TENANT = "d075cf8b-3261-481d-97e5-ba6c48d3b41f";
var OBSERVATIONS = exports.OBSERVATIONS = "Observation";
var MEDICATION_ORDER = exports.MEDICATION_ORDER = "MedicationOrder";
var HTTP_SUCCESS = exports.HTTP_SUCCESS = 200;
var INTRAVENOUS = exports.INTRAVENOUS = 'C38276';
var SUBCUTANEOUS = exports.SUBCUTANEOUS = 'C38299';
var INTRAVENOUS_TEXT = exports.INTRAVENOUS_TEXT = 'INTRAVENOUS';
var SUBCUTANEOUS_TEXT = exports.SUBCUTANEOUS_TEXT = 'SUBCUTANEOUS';

var AUTHORIZATION_HEADER = exports.AUTHORIZATION_HEADER = { Accept: "application/json+fhir" };

var LONIC_URL = exports.LONIC_URL = "http://loinc.org|";
var GLUCOSE_CODE = exports.GLUCOSE_CODE = "2345-7";
var KETONE_CODE = exports.KETONE_CODE = "2514-8";
var PH_CODE = exports.PH_CODE = "2746-6";
var SERUM_CODE = exports.SERUM_CODE = "2028-9";
var LONIC_CODES = exports.LONIC_CODES = new Map([["glucose", GLUCOSE_CODE], ["ketones", KETONE_CODE], ["ph", PH_CODE], ["serum", SERUM_CODE]]);

/*export const OBSERVATIONS_FETCH_URL =
    `https://fhir.sandboxcernerpowerchart.com/dstu2/d075cf8b-3261-481d-97e5-ba6c48d3b41f/Observation?patient=1316024&code=http://loinc.org|2345-7,http://loinc.org|8335-2,http://loinc.org|3137-7,http://loinc.org|718-7,http://loinc.org|59574-4`;*/

/*export const OBSERVATIONS_FETCH_URL = "https://fhir-open.sandboxcernerpowerchart.com/may2015/d075cf8b-3261-481d-97e5-ba6c48d3b41f/Observation?patient=1316024&code=http://loinc.org|2345-7,http://loinc.org|8335-2,http://loinc.org|3137-7,http://loinc.org|718-7,http://loinc.org|59574-4";
*/
//# sourceMappingURL=constants.js.map