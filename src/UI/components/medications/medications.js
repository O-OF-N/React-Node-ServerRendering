import React from 'react';
import MedicationsTable from './medications-table';
import { connect } from 'react-redux';
import { MedicationTableStyle } from '../styles';
import * as Constants from '../../utils/constants';
import Loading from '../loading/loading';
import Error from '../error/error';
import './medications.css';

const NonBolusMedications = ({medication}) => {
    const med = medication ? medication.medications.map(m => m.toJS()) : null;
    return (
        <div style={MedicationTableStyle}>
            <MedicationsTable data={med} title={medication.type} comments={false} />
        </div>
    );
};
const BolusMedications = ({medication}) => {
    const med = medication ? medication.medications.map(m => m.toJS()) : null;
    return (
        <div style={MedicationTableStyle}>
            <MedicationsTable data={med} title={medication.type} comments={true} />
        </div>
    );
};

const Header = () => (<div>
    <h3 className="header">Active Diabetes Med Orders</h3>
</div>
);

const toggle = dispatch => dispatch({ type: Constants.SLIDING_SCALE_TOGGLE_VISIBILITY })

const Medications = ({medicationObject, dispatch}) => medicationObject.medications ? (
    <div style={{
        width: '48%', height: '100%', padding: '1%', float: 'left'
    }}>
        <Header />
        {medicationObject.fetching ? <Loading /> :
            medicationObject.error ? <Error /> :
                medicationObject.medications.map(medication =>
                    medication.type === 'Bolus / Sliding Scale Insulin' ? <BolusMedications medication={medication} /> : <NonBolusMedications medication={medication} />
                )}
    </div>
) : null;

export default connect(state => ({
    dispatch: state.dispatch,
    medicationObject: state.medicationObject
}))(Medications);