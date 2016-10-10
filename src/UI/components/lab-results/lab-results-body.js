import React from 'react';
import {
    LabItemsStyle,
    LabItemsSpanStyle
} from '../styles';

const LabResultsBody = ({text, interpretation, quantity, date}) => (
    <div id="div-lab-body" style={LabItemsStyle}>
        <span style={LabItemsSpanStyle}>{text} </span>
        <span style={LabItemsSpanStyle}>{interpretation} </span>
        <span style={LabItemsSpanStyle}>{quantity} </span>
        <span style={LabItemsSpanStyle}>{date} </span>
    </div>
);

export default LabResultsBody;

