import React from 'react';
import {
    LabItemsStyle,
    LabItemsSpanStyle,
    LabFirstItemsSpanStyle
} from '../styles';

const LabResultsBody = ({text, interpretation, quantity, date}) => (
    <div style={LabItemsStyle}>
        <span style={LabFirstItemsSpanStyle title={text}}>{text ? text : '-'}</span>
        <span style={LabItemsSpanStyle} title = {interpretation}>{interpretation ? interpretation : '-'}</span>
        <span style={LabItemsSpanStyle} title = {quantity}>{quantity ? quantity : '-'}</span>
        <span style={LabItemsSpanStyle} title = {date ? new Date(date).toLocaleDateString() : '-'}>{date ? new Date(date).toLocaleDateString() : '-'}</span>
    </div>
);

export default LabResultsBody;

