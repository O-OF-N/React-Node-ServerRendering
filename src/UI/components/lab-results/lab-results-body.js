import React from 'react';
import {
    LabItemsStyle,
    LabItemsSpanStyle,
    LabFirstItemsSpanStyle
} from '../styles';

const LabResultsBody = ({text, interpretation, quantity, date, unit}) => (
    <div style={LabItemsStyle}>
        <span style={LabFirstItemsSpanStyle} title={text}>{text ? text : '-'}</span>
        <span style={LabItemsSpanStyle} title={quantity}>{quantity ? quantity : '-'}{unit ? ` ${unit}` : ''}</span>
        <span style={LabItemsSpanStyle} title={date ? new Date(date).toLocaleDateString() : '-'}>{date ? new Date(date).toLocaleString() : '-'}</span>
    </div>
);

export default LabResultsBody;

