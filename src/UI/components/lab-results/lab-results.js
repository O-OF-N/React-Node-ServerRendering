import React from 'react';
import LabResultsHeader from './lab-results-header';
import LabResultsBody from './lab-results-body';
import LabTable from './lab-results-table';
import { connect } from 'react-redux';
import { LabDivStyle } from '../styles';
import Loading from '../loading/loading';
import Error from '../error/error';
import './lab-results.css';

const LabResults = ({labObject}) => (
    <div style={LabDivStyle}>
        <h3 className="header">Diabetes Labs</h3>
        {
            labObject.fetching ? <Loading /> :
                labObject.error ? <Error /> :
                    <LabTable data={labObject.labMaps} />
        }
    </div>
);

export default connect(state => ({
    labObject: state.labObject
}))(LabResults);
