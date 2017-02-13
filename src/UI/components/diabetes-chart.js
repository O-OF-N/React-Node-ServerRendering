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
const styleHalf = {
    width: '58%', height: '100%', float: 'left', padding: '0.5%', maxWidth: '58%',
    maxHeight: '100%'
};

const styleFull = {
    width: '95%', height: '100%', float: 'left', padding: '0.5%', maxWidth: '100%',
    maxHeight: '100%'
};
const DiabetesChart = ({slidingScale, dispatch}) => (
    <div className="inherit">
        <Header toggle={toggle.bind(null, dispatch)} />
        {
            slidingScale.visible ?
                <div className="div-glucose-ibc" >
                    <GlucoseResults style={styleHalf} />
                    <div className="div-ibc"> <IBC /> </div>
                </div>
                : <div className="div-glucose-ibc">
                    <GlucoseResults style={styleFull} />
                </div>
        }
        <div className="div-labs-meds">
            <LabResults />
            <Medications />
        </div>

    </div >
);
export default connect(state => ({
    dispatch: state.dispatch,
    slidingScale: state.slidingScale
}))(DiabetesChart); 