import React from 'react';
import GlucoseResults from './glucose-results/glucose-results';
import LabResults from './lab-results/lab-results';
import Medications from './medications/medications';
import App from './sliding-scale/App';
import { inheritStyle } from './styles';
import * as Constants from '../utils/constants';
import { connect } from 'react-redux';

const DiabetesChart = ({dispatch, slidingScale}) => (
    <div style={inheritStyle}>
        <div style={{ width: '100%', height: '50%' }}>
            <GlucoseResults />
            <LabResults />
        </div>
        <div style={{ width: '100%', height: '40%', marginTop: '3%' }}>
            <Medications />
        </div>
        <div style={{ width: '100%', height: '5%' }}>
            <span><button onClick={toggle.bind(null, dispatch)}>Sliding scale</button></span>
        </div>
         <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        {slidingScale.visible ? (<div>
            <App />
        </div>) : null
        }
    </div>
);

const toggle = dispatch => dispatch({ type: Constants.SLIDING_SCALE_TOGGLE_VISIBILITY })

export default connect(state => ({
    dispatch: state.dispatch,
    slidingScale: state.slidingScale
}))(DiabetesChart);
