export const GLUCOSE_FETCHING = 'GLUCOSE_FETCHING';
export const GLUCOSE_FETCHED = 'GLUCOSE_FETCHED';
export const GLUCOSE_ERROR = 'GLUCOSE_ERROR';

export const LAB_FETCHING = 'LAB_FETCHING';
export const LAB_FETCHED = 'LAB_FETCHED';
export const LAB_ERROR = 'LAB_ERROR';

export const MEDICATIONS_FETCHING = 'MEDICATIONS_FETCHING';
export const MEDICATIONS_FETCHED = 'MEDICATIONS_FETCHED';
export const MEDICATIONS_ERROR = 'MEDICATIONS_ERROR';

export const SET_CARBOHYDRATE_COVERAGE = 'SET_CARBOHYDRATE_COVERAGE';
export const SET_BLOOD_GLUCOSE_COVERAGE = 'SET_BLOOD_GLUCOSE_COVERAGE';
export const SLIDING_SCALE_TOTAL = 'SLIDING_SCALE_TOTAL';
export const CLEAR_SLIDING_SCALE = 'CLEAR_SLIDING_SCALE';
export const SLIDING_SCALE_TOGGLE_VISIBILITY = 'SLIDING_SCALE_TOGGLE_VISIBILITY';

export const SET_SERVER_STATE = 'SET_SERVER_STATE';

export const GLUCOSE_FETCH_URL = "https://diabetesdashboard.herokuapp.com/observation/glucose";
export const LAB_FETCH_URL = "https://diabetesdashboard.herokuapp.com/observation/labs";
export const MEDICATIONS_FETCH_URL = "https://diabetesdashboard.herokuapp.com/medication/orders";


export const disclaimer = "This calculator is intended for healthcare professionals and cannot replace clinical judgment.\nBefore ordering or administering a bolus dose of insulin:\n* Ensure your patient has not already received a bolus dose of insulin in the last 2-3 hours;\n* Consider the current clinical situation; and\n* Always confirm the calculated dose.\nIf you have any concerns about the calculated insulin bolus dose, contact the patients supervising physician.";

/*Current Carb Formula*/
export const CCD = "CCD = Carbohydrate Coverage Dose";
export const CC = "CC = Current Carb Count";
export const ICR = "Insulin/Carbohydrate Ratio";
export const CCDFormula = "CCD = CC * ICR";

/*Blood Glucose Coverage Formula*/
export const ISFormula = "ISF = Insulin Sensitivity Factor";
export const GLU = "GLU = Current Blood Glucose";
export const TAR = "TAR = Target Blood Glucose";
export const COR = "COR = Correction Calculation";
export const GCD = "GCD = Glucose Correction Dose";
export const GCDForm1 = "If GLU <= TAR, Then GCD = 0" ;
export const GCDForm2 = "Else GCD = COR * 1";


/*Errors */
export const EmptyTextError = 'All fields are Mandatory';

export const CarbLabel = 'Carb Coverage Dose = - unit(s)';

export const InsulinLabel = 'Carb Coverage Dose = - unit(s)';
export const GlucoseError = 'blood glucose below target. Do not give any insulin.'

export const bolusLabel = 'Total Bolus Dose = - unit(s)';
export const BolusError = 'TOTAL BOLUS DOSE NOT PRESENT';
