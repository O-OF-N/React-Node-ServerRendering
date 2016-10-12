import React from 'react';
import MedicationsHeader from './medications-header';
import MedicationsBody from './medications-body';
import {connect} from 'react-redux';

const Medications = ({medications}) => {
    return (
        <div>
            <h3>Labs</h3>
            <MedicationsHeader/>
            {
            medications.map((m, i) => {
                                console.log(m);

                return <MedicationsBody key={i} {...m.toJS() }/>
            })
            }
        </div>
    )
};
export default connect(state => ({
    medications: state.medicationObject.medications
}))(Medications);