import React from 'react';
import {
    LabItemsStyle,
    LabItemsSpanStyle,
    LabFirstItemsSpanStyle
} from '../styles';

const LabResultValues = ({text, quantity, date, unit}) => (
    <div style={LabItemsStyle}>
        <span style={LabFirstItemsSpanStyle} title={text}>{text ? text : '-'}</span>
        <span style={LabItemsSpanStyle} title={quantity}>{quantity ? quantity : '-'}{unit ? ` ${unit}` : ''}</span>
        <span style={LabItemsSpanStyle} title={date ? new Date(date).toLocaleDateString() : '-'}>{date ? new Date(date).toLocaleString() : '-'}</span>
    </div>
);

const LabResultsBody = ({code, labs}) => (
    <div>
        {labs.map((l, i) => <LabResultValues key={i} {...l.toJS() } />)
        }
    </div>
)

export default LabResultsBody;

