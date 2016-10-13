import React from 'react';
import MedicationsHeader from './medications-header';
import MedicationsBody from './medications-body';
import {connect} from 'react-redux';

const Medications = ({medications}) => {
    return (
        <div>
        <div style={{ float: 'left' }}>
            <h3>INTRAVENOUS</h3>
            <MedicationsHeader/>
            {
                medications.filter(m=>m.administration ==='INTRAVENOUS').map((m, i) => <MedicationsBody key={i} {...m.toJS() }/>)
            }
        </div>
         <div style={{ float: 'left' }}>
            <h3>SUBCUTANEOUS</h3>
            <MedicationsHeader/>
            {
                medications.filter(m=>m.administration ==='SUBCUTANEOUS').map((m, i) => <MedicationsBody key={i} {...m.toJS() }/>)
            }
        </div>
        </div>
    )
};
export default connect(state => ({
    medications: state.medicationObject.medications
}))(Medications);