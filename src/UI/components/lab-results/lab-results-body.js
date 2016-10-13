import React from 'react';
import {
    LabItemsStyle,
    LabItemsSpanStyle,
    LabFirstItemsSpanStyle
} from '../styles';

const LabResultsBody = ({text, interpretation, quantity, date}) => (
    <div style={LabItemsStyle}>
        <span style={LabFirstItemsSpanStyle}>{text ? text : '-'}</span>
        <span style={LabItemsSpanStyle}>{interpretation ? interpretation : '-'}</span>
        <span style={LabItemsSpanStyle}>{quantity ? quantity : '-'}</span>
        <span style={LabItemsSpanStyle}>{date ? new Date(date).toLocaleDateString() : '-'}</span>
    </div>
);

export default LabResultsBody;

