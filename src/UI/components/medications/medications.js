import React from 'react';
import MedicationsHeader from './medications-header';
import MedicationsBody from './medications-body';
import { connect } from 'react-redux';

const Medications = ({medications}) => {
    return (
        <div style={{ width: '96%', height: 'auto', padding: '1%', display: 'inline-flex', marginTop: '0.5%' }}>
            {medications ? medications.map(medication =>
                <div style={{ float: 'left', width: '33%', paddingLeft: '0.5%' }}>
                    <h3>{medication.type}</h3>
                    <MedicationsHeader />
                    <div id="div-med-body">
                        {
                            medication.medications.map((m, i) => <MedicationsBody key={i} {...m.toJS() } />)
                        }
                    </div>
                </div>
            ) : null}

        </div>
    )
};
export default connect(state => ({
    medications: state.medicationObject.medications
}))(Medications);