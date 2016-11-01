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

export const GLUCOSE = "2345-7";
export const SERUM_CO2 = "2028-9";
export const SERUM_POTASSIUM = "2823-3";
export const SERUM_SODIUM = "2951-2";
export const ANION_GAP = "1863-0";
export const PH_VENOUS = "2746-6";
export const PH_ARTERIAL = "2744-1";
export const PCO2_Venous = "2021-4";
export const PCO2_ARTERIAL = "2019-8";
export const BASE_DEFICIT_VENOUS = "1924-0";
export const BASE_DEFICIT_ARTERIAL = "1922-4";
export const URINE_KETONE = "2514-8";

//Serum Ketones,Urine Glucose


export const LONIC_CODES = new Map([
    ["GLUCOSE", GLUCOSE],
    ["SERUM_CO2", SERUM_CO2],
    ["SERUM_POTASSIUM", SERUM_POTASSIUM],
    ["SERUM_SODIUM", SERUM_SODIUM],
    ["ANION_GAP", ANION_GAP],
    ["PH_VENOUS", PH_VENOUS],
    ["PH_ARTERIAL", PH_ARTERIAL],
    ["PCO2_Venous", PCO2_Venous],
    ["PCO2_ARTERIAL", PCO2_ARTERIAL],
    ["BASE_DEFICIT_VENOUS", BASE_DEFICIT_VENOUS],
    ["BASE_DEFICIT_ARTERIAL", BASE_DEFICIT_ARTERIAL],
    ["URINE_KETONE", URINE_KETONE]

]);

export const GLUCOSE_CODES = ["GLUCOSE"];

export const LABS_LOINIC_CODES = ["SERUM_CO2", "SERUM_POTASSIUM", "SERUM_SODIUM", "ANION_GAP", "PH_VENOUS", "PH_ARTERIAL", "PCO2_Venous", "PCO2_ARTERIAL", "BASE_DEFICIT_VENOUS", "BASE_DEFICIT_ARTERIAL", "URINE_KETONE"];

export const LAB_RESULT_COUNT = 2;


//Orders

//https://mor.nlm.nih.gov/RxNav/

export const DRIP = { code: [575148, 575628, 575146], dosage: INTRAVENOUS_TEXT };

export const BASAL = { code: [51428, 274783, 261551, 400560, 1670012, 92880, 93558, 977838, 752386], dosage: null };

/*export const BASAL = { code: [261551, 400560, 1670012, 92880, 93558, 977838, 752386], dosage: null };*/

/*export const BOLUS = { code: [575148, 575628, 575146, 575679, 575151, 1652240, 803192], dosage: SUBCUTANEOUS_TEXT };*/

export const BOLUS = { code: [51428, 274783, 261551, 400560, 1670012, 92880, 93558, 977838, 752386, 575148, 575628, 575146, 575679, 575151, 1652240, 803192], dosage: null };

export const PUMP = { names: ['insulin pump'], dosage: null };

export const ORAL_HYPOGLYCEMICS = { code: [6809, 4821, 73044, 4815], dosage: null };


export const ORDER_CATEGORIZATION = new Map([
    ['Insulin Drip', DRIP],
    ['Basal / Premixed', BASAL],
    ['Bolus / Sliding Scale', BOLUS],
    //['Insulin Pump', PUMP],
    ['Oral Hypoglycemics', ORAL_HYPOGLYCEMICS]
]);

/*export const OBSERVATIONS_FETCH_URL =
    `https://fhir.sandboxcernerpowerchart.com/dstu2/d075cf8b-3261-481d-97e5-ba6c48d3b41f/Observation?patient=1316024&code=http://loinc.org|2345-7,http://loinc.org|8335-2,http://loinc.org|3137-7,http://loinc.org|718-7,http://loinc.org|59574-4`;*/


/*export const OBSERVATIONS_FETCH_URL = "https://fhir-open.sandboxcernerpowerchart.com/may2015/d075cf8b-3261-481d-97e5-ba6c48d3b41f/Observation?patient=1316024&code=http://loinc.org|2345-7,http://loinc.org|8335-2,http://loinc.org|3137-7,http://loinc.org|718-7,http://loinc.org|59574-4";
*/
