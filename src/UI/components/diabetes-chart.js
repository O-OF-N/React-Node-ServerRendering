import React from 'react';
import GlucoseResults from './glucose-results/glucose-results';
import LabResults from './lab-results/lab-results';
import Medications from './medications/medications';

const DiabetesChart = () => (
    <div>
        <GlucoseResults/>
        <LabResults/>
    </div>
);

export default DiabetesChart;
