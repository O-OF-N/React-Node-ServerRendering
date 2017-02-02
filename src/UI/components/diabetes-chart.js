import React from 'react';
import GlucoseResults from './glucose-results/glucose-results';
import LabResults from './lab-results/lab-results';
import Medications from './medications/medications';
import IBCModal from './sliding-scale/IBC-Modal';
import { inheritStyle } from './styles';

const DiabetesChart = () => (
    <div style={inheritStyle}>

        <section className="demographics-banner">
            <header>
                <div className="demographics-row">
                    <h1>Diabetes Management</h1>
                    <button className="btn btn-outline">Insulin Bolus Calculator</button>
                </div>
            </header>
        </section>
        <div style={{ width: '100%', maxHeight: '45%' }}>
            <GlucoseResults />
        </div>
        <div style={{ width: '100%', height: '45%', marginTop: '3%' }}>
            <LabResults />
            <Medications />
        </div>
        <div> <IBCModal /> </div>
    </div>
);
export default DiabetesChart;