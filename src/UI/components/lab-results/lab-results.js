import React from 'react';
import LabResultsHeader from './lab-results-header';
import LabResultsBody from './lab-results-body';
import LabTable from './lab-results-table';
import { connect } from 'react-redux';
import { LabDivStyle } from '../styles';
import Loading from '../loading/loading';
import Error from '../error/error';

const LabResults = ({labObject}) => (
    <div style={LabDivStyle}>
        <h3>Diabetes Labs</h3> <h5>(last 2 results in past 24 hours)</h5>
        {
            this.props.labObject.fetching ? <Loading /> :
                this.props.labObject.error ? <Error /> :
                    <LabTable data={labObject.labMaps} />
        }
    </div>
);

export default connect(state => ({
    labObject: state.labObject
}))(LabResults);
