export const DOMAIN = "https://fhir-open.sandboxcernerpowerchart.com/may2015";
export const TENANT = "d075cf8b-3261-481d-97e5-ba6c48d3b41f";
export const OBSERVATIONS = "Observation";

export const AUTHORIZATION_HEADER = { Accept: "application/json+fhir" };

export const LONIC_URL = "http://loinc.org|";
export const LONIC_CODES = new Map(["glucose", "2345-7"],
    ["weight", "8335-2"],
    ["height", "3137-7"],
    ["hemoglobin", "718-7"],
    ["bmi", "59574-4"]);

export const OBSERVATIONS_FETCH_URL = 
"https://fhir.sandboxcernerpowerchart.com/d075cf8b-3261-481d-97e5-ba6c48d3b41f/Observation?patient=1316024&code=http://loinc.org|2345-7,http://loinc.org|8335-2,http://loinc.org|3137-7,http://loinc.org|718-7,http://loinc.org|59574-4";

/*"https://fhir-open.sandboxcernerpowerchart.com/may2015/d075cf8b-3261-481d-97e5-ba6c48d3b41f/Observation?patient=2744010&code=http://loinc.org|2345-7,http://loinc.org|8335-2,http://loinc.org|3137-7,http://loinc.org|718-7,http://loinc.org|59574-4";*/

