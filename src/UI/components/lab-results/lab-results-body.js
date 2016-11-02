import React from 'react';
import {
    LabItemsStyle,
    LabItemsSpanStyle,
    LabFirstItemsSpanStyle,
    LabValuesStyle,
    LabValuesDivStyle
} from '../styles';

const LabResultValues = ({text, quantity, date, unit}) => (
    <div style={LabValuesStyle}>
        <span style={LabItemsSpanStyle} title={quantity}>{quantity ? quantity : '-'}{unit ? ` ${unit}` : ''}</span>
        <span style={LabItemsSpanStyle} title={date ? new Date(date).toLocaleDateString() : '-'}>{date ? new Date(date).toLocaleString() : '-'}</span>
    </div>
);

const LabResultName = ({code}) => (
    <span style={LabFirstItemsSpanStyle} title={code}>{code ? code : '-'}</span>
);

const LabResultsBody = ({code, labs}) => (
    <div style={LabItemsStyle}>
        <LabResultName code={code} />
        <div style={LabValuesDivStyle}>
            {labs.map((l) => <LabResultValues {...l.toJS() } />)}
        </div>
    </div>
)

export default LabResultsBody;

