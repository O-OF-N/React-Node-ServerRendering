import React from 'react';
import GlucoseResults from './glucose-results/glucose-results';
import LabResults from './lab-results/lab-results';
import Medications from './medications/medications';
import IBC from './sliding-scale/IBC';
import { inheritStyle } from './styles';
import { connect } from 'react-redux';
import * as Constants from '../utils/constants';
import Header from './header/header';

const toggle = dispatch => dispatch({ type: Constants.SLIDING_SCALE_TOGGLE_VISIBILITY });
const styleHalf = {
    width: '58%', height: '100%', float: 'left', padding: '0.5%', maxWidth: '58%',
    maxHeight: '100%'
};

const styleFull = {
    width: '95%', height: '100%', float: 'left', padding: '0.5%', maxWidth: '100%',
    maxHeight: '100%', backgroundColor: 'rgba(221, 223, 224, 0.35)',
    boxShadow: 'inset 1px 0 0 0 #c8cacb'
};
const DiabetesChart = ({slidingScale, dispatch}) => (
    <div style={inheritStyle}>
        <Header toggle={toggle.bind(null, dispatch)} />
        {
            slidingScale.visible ?
                <div style={{ width: '100%', maxHeight: '45%', minHeight: '45%', backgroundColor: '#f4f4f4', boxShadow: 'inset 0 -1px 0 0 #dedfe0' }}>
                    <GlucoseResults style={styleHalf} />
                    <div style={{
                        backgroundColor: 'rgba(221, 223, 224, 0.35)',
                        boxShadow: 'inset 1px 0 0 0 #c8cacb',
                        width: '41%', overflow: 'auto', padding: '0.5%'
                    }}> <IBC /> </div>
                </div>
                : <div style={{ width: '100%', maxHeight: '45%', minHeight: '45%', backgroundColor: '#f4f4f4', boxShadow: 'inset 0 -1px 0 0 #dedfe0' }}>
                    <GlucoseResults style={styleFull} />
                </div>
        }
        <div style={{ width: '100%', maxHeight: '45%', marginTop: '3%', overflowY: 'auto' }}>
            <LabResults />
            <Medications />
        </div>

    </div >
);
export default connect(state => ({
    dispatch: state.dispatch,
    slidingScale: state.slidingScale
}))(DiabetesChart); 