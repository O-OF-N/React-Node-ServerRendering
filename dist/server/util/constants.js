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

var LONIC_URL = exports.LONIC_URL = "http://loinc.org";

var GLUCOSE = exports.GLUCOSE = "2345-7";
var SERUM_CO2 = exports.SERUM_CO2 = "2028-9";
var SERUM_POTASSIUM = exports.SERUM_POTASSIUM = "2823-3";
var SERUM_SODIUM = exports.SERUM_SODIUM = "2951-2";
var ANION_GAP = exports.ANION_GAP = "1863-0";
var PH_VENOUS = exports.PH_VENOUS = "2746-6";
var PH_ARTERIAL = exports.PH_ARTERIAL = "2744-1";
var PCO2_Venous = exports.PCO2_Venous = "2021-4";
var PCO2_ARTERIAL = exports.PCO2_ARTERIAL = "2019-8";
var BASE_DEFICIT_VENOUS = exports.BASE_DEFICIT_VENOUS = "1924-0";
var BASE_DEFICIT_ARTERIAL = exports.BASE_DEFICIT_ARTERIAL = "1922-4";
var URINE_KETONE = exports.URINE_KETONE = "2514-8";

//Serum Ketones,Urine Glucose


var LONIC_CODES = exports.LONIC_CODES = new Map([["GLUCOSE", GLUCOSE], ["SERUM_CO2", SERUM_CO2], ["SERUM_POTASSIUM", SERUM_POTASSIUM], ["SERUM_SODIUM", SERUM_SODIUM], ["ANION_GAP", ANION_GAP], ["PH_VENOUS", PH_VENOUS], ["PH_ARTERIAL", PH_ARTERIAL], ["PCO2_Venous", PCO2_Venous], ["PCO2_ARTERIAL", PCO2_ARTERIAL], ["BASE_DEFICIT_VENOUS", BASE_DEFICIT_VENOUS], ["BASE_DEFICIT_ARTERIAL", BASE_DEFICIT_ARTERIAL], ["URINE_KETONE", URINE_KETONE]]);

var GLUCOSE_CODES = exports.GLUCOSE_CODES = ["GLUCOSE"];

var LABS_LOINIC_CODES = exports.LABS_LOINIC_CODES = ["SERUM_CO2", "SERUM_POTASSIUM", "SERUM_SODIUM", "ANION_GAP", "PH_VENOUS", "PH_ARTERIAL", "PCO2_Venous", "PCO2_ARTERIAL", "BASE_DEFICIT_VENOUS", "BASE_DEFICIT_ARTERIAL", "URINE_KETONE"];

var LAB_RESULT_COUNT = exports.LAB_RESULT_COUNT = 2;

/*export const OBSERVATIONS_FETCH_URL =
    `https://fhir.sandboxcernerpowerchart.com/dstu2/d075cf8b-3261-481d-97e5-ba6c48d3b41f/Observation?patient=1316024&code=http://loinc.org|2345-7,http://loinc.org|8335-2,http://loinc.org|3137-7,http://loinc.org|718-7,http://loinc.org|59574-4`;*/

/*export const OBSERVATIONS_FETCH_URL = "https://fhir-open.sandboxcernerpowerchart.com/may2015/d075cf8b-3261-481d-97e5-ba6c48d3b41f/Observation?patient=1316024&code=http://loinc.org|2345-7,http://loinc.org|8335-2,http://loinc.org|3137-7,http://loinc.org|718-7,http://loinc.org|59574-4";
*/
//# sourceMappingURL=constants.js.map