import React from 'react';
import Table from 'rc-table';
require('rc-table/assets/index.css');

const MedicationsTable = () => (
    <div id="div-med-header" style={MedicationHeaderRowStyle} >
        <span style={MedicationFirstHeaderSpanStyle}>Medication </span>
        <span style={MedicationHeaderSpanStyle}>Dosage </span>
        <span style={MedicationHeaderSpanStyle}>Date </span>
    </div >
)

export default MedicationsHeader;