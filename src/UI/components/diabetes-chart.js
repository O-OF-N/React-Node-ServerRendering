import React from 'react';
import GlucoseResults from './glucose-results/glucose-results';
import LabResults from './lab-results/lab-results';
import Medications from './medications/medications';
import { inheritStyle } from './styles';

const DiabetesChart = () => (
    <div style={inheritStyle}>
        <div style={{ width: '100%', height: '50%' }}>
            <GlucoseResults />
            <LabResults />
        </div>
        <div style={{ width: '100%', height: '40%',marginTop: '3%' }}>
            <Medications />
        </div>
        <div style={{ width: '100%', height: '5%' }}>
            <span><button>Sliding scale</button></span>
        </div>
    </div>
);

export default DiabetesChart;
