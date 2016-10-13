import React from 'react';
import {
    MedicationItemsStyle,
    MedicationItemsSpanStyle,
    MedicationFirstItemsSpanStyle
} from '../styles';

const LabResultsBody = ({prescriber, status, date, medication, dosage, administration}) => (
    <div>
        <span>{medication ? medication : '-'}</span>
        <span>{dosage ? dosage : '-'}</span>
        <span>{date ? new Date(date).toLocaleDateString() : '-'}</span>
    </div>
);

export default LabResultsBody;