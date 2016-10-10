import React from 'react';
import LabResultsHeader from './lab-results-header';
import LabResultsBody from './lab-results-body';
import {connect} from 'react-redux';

const LabResults = ({labs}) => {
    return (
        <div>
            <LabResultsHeader/>
            {
                labs.map((l, i) => {
                    console.log(l);
                    return <LabResultsBody key={i} {...l.toJS()}/>
                })
            }
        </div>
    )
};
export default connect(state => ({
    labs: state.labObject.labs
}))(LabResults);
