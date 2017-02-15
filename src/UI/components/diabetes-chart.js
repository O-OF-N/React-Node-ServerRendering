import React from 'react';
import GlucoseResults from './glucose-results/glucose-results';
import LabResults from './lab-results/lab-results';
import Medications from './medications/medications';
import IBC from './sliding-scale/IBC';
import { connect } from 'react-redux';
import * as Constants from '../utils/constants';
import Header from './header/header';
import './diabetes-chart.css';

const toggle = dispatch => dispatch({ type: Constants.SLIDING_SCALE_TOGGLE_VISIBILITY });

const DiabetesChart = ({slidingScale, dispatch}) => (
    <div className="inherit">
        <Header toggle={toggle.bind(null, dispatch)} />
        {
            slidingScale.visible ?
                <div className="div-glucose-ibc" >
                    <GlucoseResults style="style-half" />
                    <div className="div-ibc"> <IBC toggle={toggle.bind(null, dispatch)} /> </div>
                </div>
                : <div className="div-glucose-ibc">
                    <GlucoseResults style="style-full" />
                </div>
        }
        <div className="div-labs-meds">
            <LabResults className="div-lab-desktop" />
            <Medications className="div-meds-desktop" />
        </div>

    </div >
);
export default connect(state => ({
    dispatch: state.dispatch,
    slidingScale: state.slidingScale
}))(DiabetesChart); 