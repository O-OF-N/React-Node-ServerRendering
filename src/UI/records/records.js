import { Record as immutableRecord, List as immutableList, Map as immutableMap } from 'immutable';

export const GlucoseObject = immutableRecord({
    glucose: immutableList([]),
    fetching: false,
    fetched: false,
    error: null
});

export const ServerState = immutableRecord({
    state: ''
});

export const Glucose = immutableRecord({
    date: '',
    quantity: 0,
    interpretation: '',
    source: ''
});

export const LabObject = immutableRecord({
    labMaps: immutableList([]),
    fetching: false,
    fetched: false,
    error: null
});


export const LabMaps = immutableRecord({
    code: '',
    labs: immutableList([])
});

export const Lab = immutableRecord({
    date: '',
    quantity: 0,
    interpretation: '',
    unit: '',
    text: '',
    code: ''
});

export const MedicationObject = immutableRecord({
    medications: immutableMap([]),
    fetching: false,
    fetched: false,
    error: null
});

export const MedicationOrder = new immutableRecord({
    type: '',
    medications: immutableList()
});

export const Medication = immutableRecord({
    status: '',
    date: '',
    dosage: 0,
    medication: '',
    administration: '',
    comments: '',
    ingredients: null
});

export const Ingredients = new Record({
    codes: immutableList(),
    name: ''
});

export const Height = immutableRecord({
    height: 0
});

export const Weight = immutableRecord({
    weight: 0
});

export const HGB = immutableRecord({
    hgb: 0
});

export const HttpError = immutableRecord({
    message: ''
});

export const CarbohydrateCoverage = immutableRecord({
    result: '',
    nocarb: '',
    gluc: '',
    CC: '',
    CF: ''
});

export const BloodGlucoseCoverage = immutableRecord({
    result: '',
    nocarb: '',
    gluc: '',
    CC: '',
    CF: ''
});

export const SlidingScale = immutableRecord({
    bloodGlucoseCoverage: new BloodGlucoseCoverage(),
    carbohydrateCoverage: new CarbohydrateCoverage(),
    totalResult: 0,
    visible: false
});
