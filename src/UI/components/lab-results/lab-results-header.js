import React from 'react';
import {
    LabHeaderRowStyle,
    LabHeaderSpanStyle,
    LabFirstHeaderSpanStyle
} from '../styles';

const LabResultsHeader = () => (
    <div id="div-lab-header" style={LabHeaderRowStyle} >
        <span style={LabFirstHeaderSpanStyle}>Lab </span>
        <span style={LabHeaderSpanStyle}>Result </span>
        <span style={LabHeaderSpanStyle}>Date/Time </span>
    </div >
)

export default LabResultsHeader;