import React from 'react';

const LabResultsBody = ({lab}) => {
    return (
        <div id="div-header">
            <span>{lab.text} </span>
            <span>{lab.interpretation} </span>
            <span>{lab.quantity} </span>
            <span>{lab.date} </span>
        </div>
    )
};

