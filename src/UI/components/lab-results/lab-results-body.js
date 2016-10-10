import React from 'react';
import {
    LabItemsStyle,
    LabItemsSpanStyle
} from '../styles';

const LabResultsBody = ({text, interpretation, quantity, date}) => (
    <div id="div-lab-body" style={LabItemsStyle}>
        <span style={LabItemsSpanStyle}>{text?text:'-'}</span>
        <span style={LabItemsSpanStyle}>{interpretation?interpretation:'-'}</span>
        <span style={LabItemsSpanStyle}>{quantity?quantity:'-'}</span>
        <span style={LabItemsSpanStyle}>{date?date:'-'}</span>
    </div>
);

export default LabResultsBody;

