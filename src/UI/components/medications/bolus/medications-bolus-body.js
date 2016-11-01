import React from 'react';
import {
    MedicationItemsStyle,
    MedicationItemsSpanStyle,
    MedicationFirstItemsSpanStyle
} from '../../styles';

const BolusMedicationResultsBody = ({prescriber, status, date, medication, dosage, administration}) => (
    <div id="div-med-bolus-body" style={MedicationItemsStyle}>
        <span style={MedicationBolusFirstItemsSpanStyle} title = {medication} >{medication ? medication : '-'}</span>
        <span style={MedicationBolusItemsSpanStyle} title = {dosage} > {dosage ? dosage : '-'}</span>
        <span style={MedicationBolusItemsSpanStyle} title = {date ? new Date(date).toLocaleString() : '-'} > {date ? new Date(date).toLocaleString() : '-'}</span>
        <span style={MedicationBolusItemsSpanStyle} title = {notes} > {notes ? notes : '-'}</span>
        <span style={MedicationBolusItemsSpanStyle} title = {additionalComments} > {additionalComments ? additionalComments : '-'}</span>
    </div>
);

export default BolusMedicationResultsBody;