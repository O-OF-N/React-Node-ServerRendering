import React from 'react';
import {
    MedicationHeaderRowStyle,
    MedicationHeaderSpanStyle,
    MedicationFirstHeaderSpanStyle
} from '../styles';

const MedicationsHeader = () => (
    <div id="div-med-header" style={MedicationHeaderRowStyle} >
        <span style={MedicationFirstHeaderSpanStyle}>Medication Order Details </span>
        <span style={MedicationHeaderSpanStyle}>Date </span>
    </div >
)

export default MedicationsHeader;