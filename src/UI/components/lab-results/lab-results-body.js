import React from 'react';

const LabResultsBody = ({text, interpretation, quantity, date}) => {
    console.log('text = ' + text);
    console.log('interpretation = ' + interpretation);
    console.log('quantity = ' + quantity);
    console.log('date = ' + date);
    return (
        <div id="div-header">
            <span>{text} </span>
            <span>{interpretation} </span>
            <span>{quantity} </span>
            <span>{date} </span>
        </div>
    )
};

export default LabResultsBody;

