import React from 'react';
import {
    MedicationItemsStyle,
    MedicationItemsSpanStyle,
    MedicationFirstItemsSpanStyle
} from '../styles';

const LabResultsBody = ({prescriber, status, date, medication, dosage, administration}) => (
    <div style={MedicationItemsStyle}>
        <span style={MedicationFirstItemsSpanStyle} title = {medication} >{medication ? medication : '-'}</span>
        <span style={MedicationItemsSpanStyle} title = {dosage} > {dosage ? dosage : '-'}</span>
        <span style={MedicationItemsSpanStyle} title = {dt} > {date ? new Date(date).toLocaleDateString() : '-'}</span>
    </div>
);

export default LabResultsBody;