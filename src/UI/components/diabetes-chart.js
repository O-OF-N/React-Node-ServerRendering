import React from 'react';
import GlucoseResults from './glucose-results/glucose-results';
import LabResults from './lab-results/lab-results';
import Medications from './medications/medications';

const DiabetesChart = () => (
    <div style ={{ width: '100%', height: '100%' }}>
        <div style ={{ width: '100%', height: '50%' }}>
            <GlucoseResults/>
            <LabResults/>
        </div>
        <Medications/>
    </div>
);

export default DiabetesChart;
