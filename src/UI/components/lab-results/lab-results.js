import React from 'react';
import LabResultsHeader from './lab-results-header';
import LabResultsBody from './lab-results-body';
import { connect } from 'react-redux';
import { LabDivStyle, LabBodyDivStyle } from '../styles';

const LabResults = ({labMaps}) => (
    <div style={LabDivStyle}>
        <h3>Diabetes Labs(Most recent two results captured in the past 24hrs)</h3>
        <LabResultsHeader />
        <div id="div-lab-body" style={LabBodyDivStyle}>
            {
                labMaps.map((l, i) => <LabResultsBody key={i} code={l.code} labs={l.labs} />)
            }
        </div>
    </div>
);

export default connect(state => ({
    labMaps: state.labObject.labMaps
}))(LabResults);
