import React from 'react';
import {
    MedicationItemsStyle,
    MedicationItemsSpanStyle,
    MedicationFirstItemsSpanStyle
} from '../styles';

const MedicationResultsBody = ({prescriber, status, date, medication, dosage, administration}) => (
    <div id="div-med-body" style={MedicationItemsStyle}>
        <span style={MedicationFirstItemsSpanStyle} title = {medication} >{medication ? medication : '-'}</span>
        <span style={MedicationItemsSpanStyle} title = {dosage} > {dosage ? dosage : '-'}</span>
        <span style={MedicationItemsSpanStyle} title = {date ? new Date(date).toLocaleString() : '-'} > {date ? new Date(date).toLocaleString() : '-'}</span>
    </div>
);

export default MedicationResultsBody;