import React from 'react';
import GlucoseResults from './glucose-results/glucose-results';
import LabResults from './lab-results/lab-results';
import Medications from './medications/medications';
import IBCModal from './sliding-scale/IBC-Modal';
import { inheritStyle } from './styles';


const DiabetesChart = () => (
    <div style={inheritStyle}>
        <div style={{ width: '100%', height: '50%' }}>
            <div className="dropdown">
                <button className="btn" type="button" dataToggle="dropdown" ariaHaspopup="true" ariaExpanded="false">
                    Default Dropdown
    <span className="icon-decrement icon-fallback-img" ariaLabel="Decrement"></span>
                </button>
                <ul role="menu" ariaHidden="true">
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