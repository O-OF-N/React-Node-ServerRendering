import React from 'react';
import LabResultsHeader from './lab-results-header';
import LabResultsBody from './lab-results-body';
import {connect} from 'react-redux';

const LabResults = ({labs}) => {
    const style = { border: '1px solid', width: '48%', height: '100%', float: 'left',marginLeft:'0.5%', padding:'0.5%'};
    return (
        <div style = {style}>
            <h3>Diabetes Labs</h3>(Most recent two results captured in the past 24hrs)
            <LabResultsHeader/>
            <div id="div-lab-body">
                {
                    labs.map((l, i) => <LabResultsBody key={i} {...l.toJS() }/>)
                }
            </div>
        </div>
    )
};
export default connect(state => ({
    labs: state.labObject.labs
}))(LabResults);
