export const DOMAIN = "https://fhir-open.sandboxcernerpowerchart.com/may2015";
export const TENANT = "d075cf8b-3261-481d-97e5-ba6c48d3b41f";
export const OBSERVATIONS = "Observation";
export const MEDICATION_ORDER = "MedicationOrder";
export const HTTP_SUCCESS = 200;
export const INTRAVENOUS = 'C38276';
export const SUBCUTANEOUS = 'C38299';
export const INTRAVENOUS_TEXT = 'INTRAVENOUS';
export const SUBCUTANEOUS_TEXT = 'SUBCUTANEOUS';

export const AUTHORIZATION_HEADER = { Accept: "application/json+fhir" };

export const LONIC_URL = "http://loinc.org";
export const RXNORM_URL = "http://www.nlm.nih.gov/research/umls/rxnorm";
export const OBSERVATION_CATEGORY_URL = "http://hl7.org/fhir/observation-category";

// Labs
export const GLUCOSE_SERUM_POCT = ["41653-7", "2345-7", "2339-0", "74774-1", "41652-9", "41651-1", "32016-8", "5792-7", "2350-7", "2349-9", "25428-4"];
export const SODIUM_SERUM_POCT = ["2951-2", "2947-0", "32717-1", "39792-7", "41657-8", "39791-9"];
export const POTASSIUM_SERUM_POCT = ["2823-3", "6298-4", "32713-0", "39790-1", "41656-0", "39789-3"];
export const BICARBONATE_SERUM = ["20565-8", "2028-9", "1959-6", "1962-0", "1963-8"];
export const BICARBONATE_ARTERIAL = ["1960-4"];
export const BICARBONATE_VENOUS = ["19229-4", "14627-4"];
export const BICARBONATE_CAPILLARY = ["1961-2"];
export const PH_ARTERIAL = ["2744-1"];
export const PH_VENOUS = ["19213-8", "2746-6"];
export const PH_CAPILLARY = ["2745-8"];
export const ANION_GAP_SERUM = ["33037-3", "10466-1", "73582-9", "1863-0", "77341-6"];
export const GLUCOSE_URINE = ["5792-7", "2350-7", "2349-9", "25428-4"];
export const KETONES_URINE = ["2514-8", "49779-2", "5797-6", "33903-6", "5569-9", "27132-0", "1702-0"];
export const BETA_HYDROXYBUTYRATE_URINE = ["1947-1", "29622-8"];
export const KETONES_SERUM = ["2513-0", "33058-9", "30574-8", "9425-0", "5567-3", "1705-3", "1704-6"];
export const BETA_HYDROXYBUTYRATE_SERUM = ["29512-1", "43923-2", "66441-7"];
export const HEMOGLOBIN_A1C = ["4548-4", "17856-6", "4549-2"];

export const LONIC_CODES = new Map([
    ["Glucose", GLUCOSE_SERUM_POCT],
    ["Glucose - serum/POCT", GLUCOSE_SERUM_POCT],
    ["Sodium - serum/POCT", SODIUM_SERUM_POCT],
    ["Potassium - serum/POCT", POTASSIUM_SERUM_POCT],
    ["Bicarbonate - serum", BICARBONATE_SERUM],
    ["Bicarbonate - arterial", BICARBONATE_ARTERIAL],
    ["Bicarbonate - venous", BICARBONATE_VENOUS],
    ["Bicarbonate - capillary", BICARBONATE_CAPILLARY],
    ["pH - arterial", PH_ARTERIAL],
    ["pH - venous", PH_VENOUS],
    ["pH - capillary", PH_CAPILLARY],
    ["Anion gap - serum", ANION_GAP_SERUM],
    ["Glucose - urine", GLUCOSE_URINE],
    ["Ketones - urine", KETONES_URINE],
    ["Beta-hydroxybutyrate - urine", BETA_HYDROXYBUTYRATE_URINE],
    ["Ketones - serum", KETONES_SERUM],
    ["Beta-hydroxybutyrate - serum", BETA_HYDROXYBUTYRATE_SERUM],
    ["Hemoglobin A1c", HEMOGLOBIN_A1C]
]);

export const GLUCOSE_CODES = ["Glucose"];

export const LABS_LOINIC_CODES = ["Glucose - serum/POCT", "Sodium - serum/POCT", "Potassium - serum/POCT", "Bicarbonate - serum", "Bicarbonate - arterial", "Bicarbonate - venous", "Bicarbonate - capillary", "pH - arterial", "pH - venous", "pH - capillary", "Anion gap - serum", "Glucose - urine", "Ketones - urine", "Beta-hydroxybutyrate - urine", "Ketones - serum", "Beta-hydroxybutyrate - serum", "Hemoglobin A1c"];

export const LAB_RESULT_COUNT = 2;

export const LAB_RESULT_DURATION_HOURS = 0; //If set to zero, no date condition will be added for lab results

export const GLUCOSE_RESULT_DURATION_HOURS = 0; //If set to zero, no date condition will be added for glucose results


//Orders

//https://mor.nlm.nih.gov/RxNav/

export const DRIP = { code: [[575148], [575628], [575146]], dosage: INTRAVENOUS_TEXT };

export const BASAL = { code: [[1605101], [1670007], [139825], [274783], [51428, 352385], [86009, 314684], [253182, 1605101]], dosage: null };

export const BOLUS = { code: [[51428], [400008], [86009], [253182]], dosage: SUBCUTANEOUS_TEXT };

export const ORAL_HYPOGLYCEMICS = { code: [[6809], [4821], [4815], [73044]], dosage: null };

export const ORDER_CATEGORIZATION = new Map([
    ['Insulin Drip', DRIP],
    ['Basal / Premixed Insulin', BASAL],
    ['Bolus / Sliding Scale Insulin', BOLUS],
    ['Oral Hypoglycemics', ORAL_HYPOGLYCEMICS]
]);