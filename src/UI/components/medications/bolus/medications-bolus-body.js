import React from 'react';
import {
    MedicationItemsStyle,
    MedicationBolusItemsSpanStyle,
    MedicationBolusFirstItemsSpanStyle
} from '../../styles';

const BolusMedicationResultsBody = ({date, medication, dosage, notes, additionalComments}) => (
    <div id="div-med-bolus-body" style={MedicationItemsStyle}>
        <span style={MedicationBolusFirstItemsSpanStyle} title = {medication} >{medication ? medication : '-'}</span>
        <span style={MedicationBolusItemsSpanStyle} title = {dosage} > {dosage ? dosage : '-'}</span>
        <span style={MedicationBolusItemsSpanStyle} title = {date ? new Date(date).toLocaleString() : '-'} > {date ? new Date(date).toLocaleString() : '-'}</span>
        <span style={MedicationBolusItemsSpanStyle} title = {notes} > {notes ? notes : '-'}</span>
        <span style={MedicationBolusItemsSpanStyle} title = {comments} > {comments ? comments : '-'}</span>
    </div>
);

export default BolusMedicationResultsBody;