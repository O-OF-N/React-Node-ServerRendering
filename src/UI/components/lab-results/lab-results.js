import React from 'react';
import LabResultsHeader from './lab-results-header';
import LabResultsBody from './lab-results-body';

const LabResults = () => {
    return (
        <div>
            <LabResultsHeader/>
            {
                labs.map(l => <LabResultsBody lab = {l}/>)
            }
        </div>
    )
};
export default connect = ((state) => ({
    labs: state.labObject.labs
}))(LabResults);
