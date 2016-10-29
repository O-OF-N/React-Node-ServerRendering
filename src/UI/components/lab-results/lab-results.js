import React from 'react';
import LabResultsHeader from './lab-results-header';
import LabResultsBody from './lab-results-body';
import { connect } from 'react-redux';

const LabResults = ({labMaps}) => {
    const style = { border: '1px solid', width: '48%', height: '100%', float: 'left', marginLeft: '0.5%', padding: '0.5%' };
    return (
        <div style={style}>
            <h3>Diabetes Labs(Most recent two results captured in the past 24hrs)</h3>
            <LabResultsHeader />
            <div id="div-lab-body">
                {
                    labMaps.map((l, i) => <LabResultsBody key={i} {...l.toJS() } />)
                }
            </div>
        </div>
    )
};
export default connect(state => ({
    labMaps: state.labObject.labMaps
}))(LabResults);
