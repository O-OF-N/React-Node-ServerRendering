import React from 'react';
import MedicationsHeader from './medications-header';
import MedicationsBody from './medications-body';
import BolusMedicationsHeader from './bolus/medications-bolus-header';
import BolusMedicationsBody from './bolus/medications-bolus-body';
import { connect } from 'react-redux';
import { MedicationTableStyle, MedicationBodyDivStyle } from '../styles';
import Table from 'rc-table';
require('rc-table/assets/index.css');

const NonBolusMedications = ({medication}) => medication ? (
    <div style={MedicationTableStyle}>
        <h3>{medication.type}</h3>
        <MedicationsHeader />
        <div id="div-med-body" style={MedicationBodyDivStyle}>
            {
                medication.medications.map((m, i) => <MedicationsBody key={i} {...m.toJS() } />)
            }
        </div>
    </div>
) : null;

const BolusMedications = ({medication}) => {
    const med = medication ? medication.medications.map(m => m.toJS()) : null;
    return (
        <div style={MedicationTableStyle}>
            <h3>{medication.type}</h3>
            <Table columns={columns} data={med} className="table"/>
        </div>
    );
}

const Medications = ({medications}) => {
    return (
        <div style={{ width: '96%', height: '100%', padding: '1%', marginTop: '0.5%' }}>
            {medications ? medications.map(medication =>
                medication.type === 'Bolus / Sliding Scale' ? <BolusMedications medication={medication} /> : <NonBolusMedications medication={medication} />
            ) : null}

        </div>
    )
};

const columns = [{
    title: 'Medication', dataIndex: 'medication', key: 'medication', width: 100,
}, {
    title: 'Dosage', dataIndex: 'dosage', key: 'dosage', width: 100,
}, {
    title: 'Date', dataIndex: 'date', key: 'date', width: 200,
}, {
    title: 'Comments', dataIndex: 'comments', key: 'comments', width: 200
}];

export default connect(state => ({
    medications: state.medicationObject.medications
}))(Medications);