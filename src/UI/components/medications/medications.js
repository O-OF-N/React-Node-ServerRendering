import React from 'react';
import BolusMedicationsTable from './bolus/medications-bolus-table';
import MedicationsTable from './medications-table';
import { connect } from 'react-redux';
import { MedicationTableStyle } from '../styles';
import * as Constants from '../../utils/constants';

const NonBolusMedications = ({medication}) => {
    const med = medication ? medication.medications.map(m => m.toJS()) : null;
    return (
        <div style={MedicationTableStyle}>
            <MedicationsTable data={med} title={medication.type} />
        </div>
    );
};
const BolusMedications = ({medication}) => {
    const med = medication ? medication.medications.map(m => m.toJS()) : null;
    return (
        <div style={MedicationTableStyle}>
            <BolusMedicationsTable data={med} title={medication.type} />
        </div>
    );
};

const Header = ({dis}) => (<div>
    <h3>Active Diabetes Med Orders</h3>
    <span style={{ paddingLeft: "1%" }}>
        <button onClick={toggle.bind(null, dis)}>Insulin Bolus Calculator</button>
    </span>
</div>
);

const toggle = dispatch => dispatch({ type: Constants.SLIDING_SCALE_TOGGLE_VISIBILITY })

const Medications = ({medications, dispatch}) => medications ? (
    <div style={{ width: '96%', height: '100%', padding: '1%', marginTop: '0.5%' }}>
        <Header dis={dispatch} />
        {medications.map(medication =>
            medication.type === 'Bolus / Sliding Scale Insulin' ? <BolusMedications medication={medication} /> : <NonBolusMedications medication={medication} />
        )}
    </div>
) : null;

export default connect(state => ({
    dispatch: state.dispatch,
    medications: state.medicationObject.medications
}))(Medications);