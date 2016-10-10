import React from 'react';
import GlucoseResults from './glucose-results/glucose-results';
import LabResults from './lab-results/lab-results';

const DiabetesChart = () => (
    <div>
        <h1> Diabetes Chart </h1>
        <GlucoseResults/>
        <LabResults/>
    </div>
);
