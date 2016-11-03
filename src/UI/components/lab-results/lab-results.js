import React from 'react';
import LabResultsHeader from './lab-results-header';
import LabResultsBody from './lab-results-body';
import LabTable from './lab-results-table';
import { connect } from 'react-redux';
import { LabDivStyle, LabBodyDivStyle } from '../styles';

const LabResults = ({labMaps}) => (
    <div style={LabDivStyle}>
        <h3>Diabetes Labs(Most recent two results captured in the past 24hrs)</h3>
        <LabTable data={labMaps} />
    </div>
);

export default connect(state => ({
    labMaps: state.labObject.labMaps
}))(LabResults);
