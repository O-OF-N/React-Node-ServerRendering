import React from 'react';
import {
    MedicationItemsStyle,
    MedicationItemsSpanStyle,
    MedicationFirstItemsSpanStyle
} from '../styles';

const LabResultsBody = ({prescriber, status, date, medication, dosage, administration}) => (
    <div id="div-lab-body" style={MedicationItemsStyle}>
        <span style={MedicationFirstItemsSpanStyle}>{medication ? medication : '-'}</span>
        <span style={MedicationItemsSpanStyle}>{dosage ? dosage : '-'}</span>
        <span style={MedicationItemsSpanStyle}>{status ? status : '-'}</span>
        <span style={MedicationItemsSpanStyle}>{prescriber ? prescriber : '-'}</span>
        <span style={MedicationItemsSpanStyle}>{administration ? administration : '-'}</span>
        <span style={MedicationItemsSpanStyle}>{date ? new Date(date).toLocaleDateString() : '-'}</span>
    </div>
);

export default LabResultsBody;