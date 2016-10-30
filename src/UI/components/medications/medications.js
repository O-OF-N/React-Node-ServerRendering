import React from 'react';
import MedicationsHeader from './medications-header';
import MedicationsBody from './medications-body';
import {connect} from 'react-redux';

const Medications = ({medications}) => {
    return (
        <div style = {{width: '96%',height: 'auto',padding: '1%',display: 'inline-flex',marginTop: '0.5%'}}>
            <div style={{ float: 'left', width:'49%', paddingLeft:'0.5%' }}>
                <h3>INTRAVENOUS</h3>
                <MedicationsHeader/>
                <div id="div-med-body-1">
                    {
                        medications.filter(m => m.administration === 'INTRAVENOUS').map((m, i) => <MedicationsBody key={i} {...m.toJS() }/>)
                    }
                </div>
            </div>
            <div style={{ float: 'left', width:'49%', paddingLeft:'0.5%' }}>
                <h3>SUBCUTANEOUS</h3>
                <MedicationsHeader/>
                <div id="div-med-body-2">
                    {
                        medications.filter(m => m.administration === 'SUBCUTANEOUS').map((m, i) => <MedicationsBody key={i} {...m.toJS() }/>)
                    }
                </div>
            </div>
        </div>
    )
};
export default connect(state => ({
    medications: state.medicationObject.medications
}))(Medications);