import { Record as immutableRecord, List as immutableList } from 'immutable';

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
    interpretation: ''
});

export const LabObject = immutableRecord({
    labs: immutableList([]),
    fetching: false,
    fetched: false,
    error: null
});

export const Lab = immutableRecord({
    date: '',
    quantity: 0,
    interpretation: '',
    text: ''
});

export const MedicationObject = immutableRecord({
    medications: immutableList([]),
    fetching: false,
    fetched: false,
    error: null
});

export const Medication = immutableRecord({
    status: '',
    prescriber: '',
    date: '',
    dosage: 0,
    medication: '',
    administration: ''
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
