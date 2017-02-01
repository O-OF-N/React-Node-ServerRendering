import React from 'react';
import GlucoseResults from './glucose-results/glucose-results';
import LabResults from './lab-results/lab-results';
import Medications from './medications/medications';
import IBCModal from './sliding-scale/IBC-Modal';
import { inheritStyle } from './styles';

const DiabetesChart = () => (
    <div style={inheritStyle}>
        <div style={{ width: '100%' }}>
            <GlucoseResults />
        </div>
        <div style={{ width: '100%', marginTop: '3%' }}>
            <LabResults />
            <Medications />
        </div>
        <div> <IBCModal /> </div>
    </div>
);
export default DiabetesChart;