import React from 'react';
import GlucoseResults from './glucose-results/glucose-results';
import LabResults from './lab-results/lab-results';
import Medications from './medications/medications';
import IBCModal from './sliding-scale/IBC-Modal';
import { inheritStyle } from './styles';

const DiabetesChart = () => (
    <div style={inheritStyle}>
        <div style={{ width: '100%', height: '50%' }}>
            <div class="dropdown">
                <button class="btn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Default Dropdown
    <span class="icon-decrement icon-fallback-img" aria-label="Decrement"></span>
                </button>
                <ul role="menu" aria-hidden="true">
                    <li>
                        <a href="#">Default Link One</a>
                    </li>
                    <li>
                        <a href="#">Default Link Two</a>
                    </li>
                    <li>
                        <a href="#">Default Link Three</a>
                    </li>
                </ul>
            </div>
            <GlucoseResults />
            <LabResults />
        </div>
        <div style={{ width: '100%', height: '40%', marginTop: '3%' }}>
            <Medications />
        </div>
        <div> <IBCModal /> </div>
    </div>
);
export default DiabetesChart;