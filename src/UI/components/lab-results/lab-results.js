import React from 'react';
import LabTable from './lab-results-table';
import { connect } from 'react-redux';
import Loading from '../loading/loading';
import Error from '../error/error';
import './lab-results.css';

const LabResults = ({labObject}) => (
    <div className="lab-div-style">
        <h3 className="header">Diabetes Labs</h3>
        <h5 className="header">Last 2 results in past 24 hours</h5>
        {
            labObject.fetching ? <Loading /> :
                labObject.error ? <Error /> :
                    <div className="table-div">
                        <LabTable data={labObject.labMaps} />
                    </div>
        }
    </div>
);

export default connect(state => ({
    labObject: state.labObject
}))(LabResults);
