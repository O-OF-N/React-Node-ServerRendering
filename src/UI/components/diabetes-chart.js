import React from 'react';
import GlucoseResults from './glucose-results/glucose-results';
import LabResults from './lab-results/lab-results';
import Medications from './medications/medications';
import IBC from './sliding-scale/IBC';
import { inheritStyle } from './styles';
import { connect } from 'react-redux';
import * as Constants from '../utils/constants';

const toggle = dispatch => dispatch({ type: Constants.SLIDING_SCALE_TOGGLE_VISIBILITY });
const styleHalf = {
    width: '48%', height: '100%', float: 'left', paddingLeft: '0.5%', maxWidth: '48%',
    maxHeight: '100%'
};

const styleFull = {
    width: '95%', height: '100%', float: 'left', paddingLeft: '0.5%', maxWidth: '100%',
    maxHeight: '100%'
};
const DiabetesChart = ({slidingScale, dispatch}) => (
    <div style={inheritStyle}>

        <section className="demographics-banner">
            <header>
                <div className="demographics-row">
                    <h1>Diabetes Management
                    <button className="btn btn-default" style={{ float: 'left' }} onClick={toggle.bind(null, dispatch)}>Insulin Bolus Calculator</button>
                    </h1>
                </div>
            </header>
        </section>
        {
            slidingScale.visible ?
                <div style={{ width: '100%', maxHeight: '45%', minHeight: '45%' }}>
                    <GlucoseResults style={styleHalf} />
                    <div style={{ width: '40%', overflow: 'auto' }}> <IBC /> </div>
                </div>
                : <div style={{ width: '100%', maxHeight: '45%', minHeight: '45%' }}>
                    <GlucoseResults style={styleFull} />
                </div>
        }
        <div style={{ width: '100%', height: '45%', marginTop: '3%' }}>
            <LabResults />
            <Medications />
        </div>

    </div>
);
export default connect(state => ({
    dispatch: state.dispatch,
    slidingScale: state.slidingScale
}))(DiabetesChart);