import React from 'react';
import GlucoseResults from './glucose-results/glucose-results';
import LabResults from './lab-results/lab-results';

export default class DiabeticsChart extends React.Component {
    render() {
        return (
            <div>
                <h1> Diabetes Chart </h1>
                <GlucoseResults/>
                <LabResults/>
            </div>
        );
    }
};

