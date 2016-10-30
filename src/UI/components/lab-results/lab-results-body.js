import React from 'react';
import {
    LabItemsStyle,
    LabItemsSpanStyle,
    LabFirstItemsSpanStyle,
    LabValuesStyle
} from '../styles';

const LabResultValues = ({text, quantity, date, unit}) => (
    <div >
        <span style={LabItemsSpanStyle} title={quantity}>{quantity ? quantity : '-'}{unit ? ` ${unit}` : ''}</span>
        <span style={LabItemsSpanStyle} title={date ? new Date(date).toLocaleDateString() : '-'}>{date ? new Date(date).toLocaleString() : '-'}</span>
    </div>
);

const LabResultName = ({labs}) => {
    const text = labs.get(0).text;
    return (
        <span style={LabFirstItemsSpanStyle} title={text}>{text ? text : '-'}</span>
    );
};

const LabResultsBody = ({code, labs}) => (
    <div style={LabItemsStyle}>
        <LabResultName labs={labs} />
        <div style={LabValuesStyle}>
            {labs.map((l) => <LabResultValues {...l.toJS() } />)}
        </div>
    </div>
)

export default LabResultsBody;

