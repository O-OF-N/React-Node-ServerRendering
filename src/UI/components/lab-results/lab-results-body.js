import React from 'react';
import {
    LabItemsStyle,
    LabItemsSpanStyle,
    LabFirstItemsSpanStyle
} from '../styles';

const LabResultValues = ({text, quantity, date, unit}) => (
    <div style={LabItemsStyle}>
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
    <div>
        {labs ?
            <div style={LabItemsStyle}>
                <LabResultName labs={labs} />
                labs.map((l, i) => <LabResultValues key={i} {...l.toJS() } />)

    </div> : null
        }
    </div>
)

export default LabResultsBody;

