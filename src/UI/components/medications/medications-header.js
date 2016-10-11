import React from 'react';
import {
    MedicationHeaderRowStyle,
    MedicationHeaderSpanStyle,
    MedicationFirstHeaderSpanStyle
} from '../styles';

const MedicationsHeader = () => (
    <div id="div-lab-header" style={MedicationHeaderRowStyle} >
        <span style={MedicationFirstHeaderSpanStyle}>Medication </span>
        <span style={MedicationHeaderSpanStyle}>Dosage </span>
        <span style={MedicationHeaderSpanStyle}>Status </span>
        <span style={MedicationHeaderSpanStyle}>Prescriber </span>
        <span style={MedicationHeaderSpanStyle}>Date </span>
    </div >
)

export default MedicationsHeader;