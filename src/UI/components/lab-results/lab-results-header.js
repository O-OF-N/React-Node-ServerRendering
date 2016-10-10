import React from 'react';
import {
    LabHeaderRowStyle,
    LabHeaderSpanStyle,
    LabFirstHeaderSpanStyle
} from '../styles';

const LabResultsHeader = () => (
    <div id="div-lab-header" style={LabHeaderRowStyle} >
        <span style={LabFirstHeaderSpanStyle}>Result </span>
        <span style={LabHeaderSpanStyle}>Interpretation </span>
        <span style={LabHeaderSpanStyle}>Value </span>
        <span style={LabHeaderSpanStyle}>Date </span>
    </div >
)

export default LabResultsHeader;