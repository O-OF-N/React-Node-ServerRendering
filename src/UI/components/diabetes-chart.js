import React from 'react';
import GlucoseResults from './glucose-results/glucose-results';
import LabResults from './lab-results/lab-results';
import Medications from './medications/medications';
import IBCModal from './sliding-scale/IBC-Modal';
import { inheritStyle } from './styles';

const DiabetesChart = () => (
    <div style={inheritStyle}>

        <section class="demographics-banner">
            <header>
                <div class="demographics-row">
                    <h1>Doe, Jane</h1>
                    <h1>St. John's Heroes Wing Bed Eight</h1>
                </div>
                <div class="demographics-row">
                    <span><b>22 yrs</b> <b>F</b> DOB: <b>04/13/92</b></span>
                    <span>MRN: <b>6789235423</b></span>
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