"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var EXPIRATION_TIME = exports.EXPIRATION_TIME = 500;

//Reference URLs
var LONIC_URL = exports.LONIC_URL = "http://loinc.org";
var RXNORM_URL = exports.RXNORM_URL = "http://www.nlm.nih.gov/research/umls/rxnorm";
var OBSERVATION_CATEGORY_URL = exports.OBSERVATION_CATEGORY_URL = "http://hl7.org/fhir/observation-category";

//Application Constants
var OBSERVATIONS = exports.OBSERVATIONS = "Observation";
var MEDICATION_ORDER = exports.MEDICATION_ORDER = "MedicationOrder";
var HTTP_SUCCESS = exports.HTTP_SUCCESS = 200;
var INTRAVENOUS = exports.INTRAVENOUS = 'C38276';
var SUBCUTANEOUS = exports.SUBCUTANEOUS = 'C38299';
var INTRAVENOUS_TEXT = exports.INTRAVENOUS_TEXT = 'INTRAVENOUS';
var SUBCUTANEOUS_TEXT = exports.SUBCUTANEOUS_TEXT = 'SUBCUTANEOUS';

var AUTHORIZATION_HEADER = exports.AUTHORIZATION_HEADER = { Accept: "application/json+fhir" };

// Labs constants
var GLUCOSE_SERUM_POCT = exports.GLUCOSE_SERUM_POCT = ["41653-7", "2345-7", "2339-0", "74774-1", "41652-9", "41651-1", "32016-8", "5792-7", "2350-7", "2349-9", "25428-4"];
var SODIUM_SERUM_POCT = exports.SODIUM_SERUM_POCT = ["2951-2", "2947-0", "32717-1", "39792-7", "41657-8", "39791-9"];
var POTASSIUM_SERUM_POCT = exports.POTASSIUM_SERUM_POCT = ["2823-3", "6298-4", "32713-0", "39790-1", "41656-0", "39789-3"];
var BICARBONATE_SERUM = exports.BICARBONATE_SERUM = ["20565-8", "2028-9", "1959-6", "1962-0", "1963-8"];
var BICARBONATE_ARTERIAL = exports.BICARBONATE_ARTERIAL = ["1960-4"];
var BICARBONATE_VENOUS = exports.BICARBONATE_VENOUS = ["19229-4", "14627-4"];
var BICARBONATE_CAPILLARY = exports.BICARBONATE_CAPILLARY = ["1961-2"];
var PH_ARTERIAL = exports.PH_ARTERIAL = ["2744-1"];
var PH_VENOUS = exports.PH_VENOUS = ["19213-8", "2746-6"];
var PH_CAPILLARY = exports.PH_CAPILLARY = ["2745-8"];
var ANION_GAP_SERUM = exports.ANION_GAP_SERUM = ["33037-3", "10466-1", "73582-9", "1863-0", "77341-6"];
var GLUCOSE_URINE = exports.GLUCOSE_URINE = ["5792-7", "2350-7", "2349-9", "25428-4"];
var KETONES_URINE = exports.KETONES_URINE = ["2514-8", "49779-2", "5797-6", "33903-6", "5569-9", "27132-0", "1702-0"];
var BETA_HYDROXYBUTYRATE_URINE = exports.BETA_HYDROXYBUTYRATE_URINE = ["1947-1", "29622-8"];
var KETONES_SERUM = exports.KETONES_SERUM = ["2513-0", "33058-9", "30574-8", "9425-0", "5567-3", "1705-3", "1704-6"];
var BETA_HYDROXYBUTYRATE_SERUM = exports.BETA_HYDROXYBUTYRATE_SERUM = ["29512-1", "43923-2", "66441-7"];
var HEMOGLOBIN_A1C = exports.HEMOGLOBIN_A1C = ["4548-4", "17856-6", "4549-2"];

var LONIC_CODES = exports.LONIC_CODES = new Map([["Glucose", GLUCOSE_SERUM_POCT], ["Glucose - serum/POCT", GLUCOSE_SERUM_POCT], ["Sodium - serum/POCT", SODIUM_SERUM_POCT], ["Potassium - serum/POCT", POTASSIUM_SERUM_POCT], ["Bicarbonate - serum", BICARBONATE_SERUM], ["Bicarbonate - arterial", BICARBONATE_ARTERIAL], ["Bicarbonate - venous", BICARBONATE_VENOUS], ["Bicarbonate - capillary", BICARBONATE_CAPILLARY], ["pH - arterial", PH_ARTERIAL], ["pH - venous", PH_VENOUS], ["pH - capillary", PH_CAPILLARY], ["Anion gap - serum", ANION_GAP_SERUM], ["Glucose - urine", GLUCOSE_URINE], ["Ketones - urine", KETONES_URINE], ["Beta-hydroxybutyrate - urine", BETA_HYDROXYBUTYRATE_URINE], ["Ketones - serum", KETONES_SERUM], ["Beta-hydroxybutyrate - serum", BETA_HYDROXYBUTYRATE_SERUM], ["Hemoglobin A1c", HEMOGLOBIN_A1C]]);

var GLUCOSE_CODES = exports.GLUCOSE_CODES = ["Glucose"];

var LABS_LOINIC_CODES = exports.LABS_LOINIC_CODES = ["Glucose - serum/POCT", "Sodium - serum/POCT", "Potassium - serum/POCT", "Bicarbonate - serum", "Bicarbonate - arterial", "Bicarbonate - venous", "Bicarbonate - capillary", "pH - arterial", "pH - venous", "pH - capillary", "Anion gap - serum", "Glucose - urine", "Ketones - urine", "Beta-hydroxybutyrate - urine", "Ketones - serum", "Beta-hydroxybutyrate - serum", "Hemoglobin A1c"];

var LAB_RESULT_COUNT = exports.LAB_RESULT_COUNT = 2;

var LAB_RESULT_DURATION_HOURS = exports.LAB_RESULT_DURATION_HOURS = 0; //If set to zero, no date condition will be added for lab results

var GLUCOSE_RESULT_DURATION_HOURS = exports.GLUCOSE_RESULT_DURATION_HOURS = 0; //If set to zero, no date condition will be added for glucose results


//Orders constants

//https://mor.nlm.nih.gov/RxNav/

var DRIP = exports.DRIP = { code: [[575148], [575628], [575146]], dosage: INTRAVENOUS_TEXT };

var BASAL = exports.BASAL = { code: [[1605101], [1670007], [139825], [274783], [51428, 352385], [86009, 314684], [253182, 1605101]], dosage: null };

var BOLUS = exports.BOLUS = { code: [[51428], [400008], [86009], [253182]], dosage: SUBCUTANEOUS_TEXT };

var ORAL_HYPOGLYCEMICS = exports.ORAL_HYPOGLYCEMICS = { code: [[6809], [4821], [4815], [73044]], dosage: null };

var ORDER_CATEGORIZATION = exports.ORDER_CATEGORIZATION = new Map([['Insulin Drip', DRIP], ['Basal / Premixed Insulin', BASAL], ['Bolus / Sliding Scale Insulin', BOLUS], ['Oral Hypoglycemics', ORAL_HYPOGLYCEMICS]]);
//# sourceMappingURL=constants.js.map