import React from 'react';
import MedicationsHeader from './medications-header';
import MedicationsBody from './medications-body';
import {connect} from 'react-redux';

const Medications = ({medications}) => {
    return (
        <div>
            <h3>Medications</h3>
            <MedicationsHeader/>
            {
                medications.map((m, i) => <MedicationsBody key={i} {...m.toJS() }/>)
            }
        </div>
    )
};
export default connect(state => ({
    medications: state.medicationObject.medications
}))(Medications);