"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var OBSERVATIONS_FETCH_URL = exports.OBSERVATIONS_FETCH_URL = "https://fhir-open.sandboxcernerpowerchart.com/may2015/d075cf8b-3261-481d-97e5-ba6c48d3b41f/Observation?patient=2744010&code=http://loinc.org|2345-7,http://loinc.org|8335-2,http://loinc.org|3137-7,http://loinc.org|718-7,http://loinc.org|59574-4";
var AUTHORIZATION_HEADER = exports.AUTHORIZATION_HEADER = { Accept: "application/json+fhir" };
var AUTHORIZATION_URL = exports.AUTHORIZATION_URL = "https://fhir-open.sandboxcernerpowerchart.com/dstu2/d075cf8b-3261-481d-97e5-ba6c48d3b41f/metadata";
var GLUCOSE_CODE = exports.GLUCOSE_CODE = "2345-7";

var RESPONSE_TYPE = exports.RESPONSE_TYPE = "code";
var SCOPE = exports.SCOPE = "launch+user%2FObservation.read";
var REDIRECT_URL = exports.REDIRECT_URL = "https://diabetesdashboard.herokuapp.com/callback";
var CLIENT_ID = exports.CLIENT_ID = "707ffe10-83ee-42f2-b2e8-1871ad0c1a4c";

var GRANT_TYPE = exports.GRANT_TYPE = "authorization_code";

var TOKEN_URL = exports.TOKEN_URL = "https://authorization.sandboxcerner.com/tenants/d075cf8b-3261-481d-97e5-ba6c48d3b41f/protocols/oauth2/profiles/smart-v1/token";
/*const url = 'https://authorization.sandboxcerner.com/tenants/d075cf8b-3261-481d-97e5-ba6c48d3b41f/protocols/oauth2/profiles/smart-v1/personas/provider/authorize?response_type=code&client_id=707ffe10-83ee-42f2-b2e8-1871ad0c1a4c&redirect_uri=https%3A%2F%2Fdiabetesdashboard.herokuapp.com%2Fcallback&launch=a614a069-d293-492a-8a5e-c6d7d3d9ad18&scope=launch+user%2FObservation.read&state=98wrghuwuogerg97&aud=https://fhir.sandboxcernerpowerchart.com/dstu2/d075cf8b-3261-481d-97e5-ba6c48d3b41f';
*/
//# sourceMappingURL=constants.js.map