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

export const LONIC_URL = "http://loinc.org|";


export const GLUCOSE = "2345-7";
export const SERUM_CO2 ="2028-9";
export const SERUM_POTASSIUM= "2823-3";
export const SERUM_SODIUM= "2951-2";
export const ANION_GAP= "1863-0";
export const PH_VENOUS ="2746-6";
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
    ["SERUM_SODIUM",SERUM_SODIUM],
    ["ANION_GAP",ANION_GAP],
    ["PH_VENOUS",PH_VENOUS],
    ["PH_ARTERIAL",PH_ARTERIAL],
    ["PCO2_Venous",PCO2_Venous],
    ["PCO2_ARTERIAL",PCO2_ARTERIAL],
    ["BASE_DEFICIT_VENOUS",BASE_DEFICIT_VENOUS],
    ["BASE_DEFICIT_ARTERIAL",BASE_DEFICIT_ARTERIAL],
    ["URINE_KETONE",URINE_KETONE]

]);

export const LABS_LOINIC_CODES =["SERUM_CO2", "SERUM_POTASSIUM", "SERUM_SODIUM", "ANION_GAP", "PH_VENOUS", "PH_ARTERIAL", "PCO2_Venous", "PCO2_ARTERIAL", "BASE_DEFICIT_VENOUS", "BASE_DEFICIT_ARTERIAL", "URINE_KETONE"];



/*export const OBSERVATIONS_FETCH_URL =
    `https://fhir.sandboxcernerpowerchart.com/dstu2/d075cf8b-3261-481d-97e5-ba6c48d3b41f/Observation?patient=1316024&code=http://loinc.org|2345-7,http://loinc.org|8335-2,http://loinc.org|3137-7,http://loinc.org|718-7,http://loinc.org|59574-4`;*/


/*export const OBSERVATIONS_FETCH_URL = "https://fhir-open.sandboxcernerpowerchart.com/may2015/d075cf8b-3261-481d-97e5-ba6c48d3b41f/Observation?patient=1316024&code=http://loinc.org|2345-7,http://loinc.org|8335-2,http://loinc.org|3137-7,http://loinc.org|718-7,http://loinc.org|59574-4";
*/
