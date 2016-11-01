import React from 'react';
import MedicationsHeader from './medications-header';
import MedicationsBody from './medications-body';
import BolusMedicationsHeader from './bolus/medications-bolus-header';
import BolusMedicationsBody from './bolus/medications-bolus-body';
import { connect } from 'react-redux';

const NonBolusMedications = ({medication}) => medication ? (
    <div style={{ float: 'left', width: '33%', paddingLeft: '0.5%' }}>
        <h3>{medication.type}</h3>
        <MedicationsHeader />
        <div id="div-med-body">
            {
                medication.medications.map((m, i) => <MedicationsBody key={i} {...m.toJS() } />)
            }
        </div>
    </div>
) : null;

const BolusMedications = ({medication}) => medication ? (
    <div style={{ float: 'left', width: '40%', paddingLeft: '0.5%' }}>
        <h3>{medication.type}</h3>
        <BolusMedicationsHeader />
        <div id="div-med-body">
            {
                medication.medications.map((m, i) => <BolusMedicationsBody key={i} {...m.toJS() } />)
            }
        </div>
    </div>
) : null;

const Medications = ({medications}) => {
    return (
        <div style={{ width: '96%', height: 'auto', padding: '1%', marginTop: '0.5%' }}>
            {medications ? medications.map(medication =>
                medication.type === 'Bolus / Sliding Scale' ? <BolusMedications medication={medication} /> : <NonBolusMedications medication={medication} />
            ) : null}

        </div>
    )
};
export default connect(state => ({
    medications: state.medicationObject.medications
}))(Medications);