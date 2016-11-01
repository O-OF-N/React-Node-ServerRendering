import React from 'react';
import {
    MedicationHeaderRowStyle,
    MedicationHeaderSpanStyle,
    MedicationFirstHeaderSpanStyle
} from '../styles';

const MedicationsHeader = () => (
    <div id="div-med-header" style={MedicationHeaderRowStyle} >
        <span style={MedicationFirstHeaderSpanStyle}>Medication </span>
        <span style={MedicationHeaderSpanStyle}>Dosage </span>
        <span style={MedicationHeaderSpanStyle}>Date </span>
    </div >
)

export default MedicationsHeader;