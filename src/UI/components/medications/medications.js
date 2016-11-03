import React from 'react';
import MedicationsHeader from './medications-header';
import MedicationsBody from './medications-body';
import BolusMedicationsHeader from './bolus/medications-bolus-header';
import BolusMedicationsBody from './bolus/medications-bolus-body';
import BolusMedicationsTable from './bolus/medications-bolus-table';
import MedicationsTable from './medications-table';
import { connect } from 'react-redux';
import { MedicationTableStyle, MedicationBodyDivStyle } from '../styles';


const NonBolusMedications = ({medication}) => {
    const med = medication ? medication.medications.map(m => m.toJS()) : null;
    return (
        <div style={MedicationTableStyle}>
            <MedicationsTable data={med} title = {medication.type}/>
        </div>
    );
};
const BolusMedications = ({medication}) => {
    const med = medication ? medication.medications.map(m => m.toJS()) : null;
    return (
        <div style={MedicationTableStyle}>
            <BolusMedicationsTable data={med} title = {medication.type}/>
        </div>
    );
};

const Medications = ({medications}) => {
    return (
        <div style={{ width: '96%', height: '100%', padding: '1%', marginTop: '0.5%' }}>
            {medications ? medications.map(medication =>
                medication.type === 'Bolus / Sliding Scale' ? <BolusMedications medication={medication} /> : <NonBolusMedications medication={medication} />
            ) : null}

        </div>
    )
};

export default connect(state => ({
    medications: state.medicationObject.medications
}))(Medications);