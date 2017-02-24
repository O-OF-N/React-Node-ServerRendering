import React from 'react';
import LabTable from './lab-results-table';
import { connect } from 'react-redux';
import Loading from '../loading/loading';
import Error from '../error/error';
import './lab-results.css';

const LabResults = ({labObject}) => (
    <div className="div-lab">
        <h3 className="header">Diabetes Lab Results</h3>
        {
            labObject.fetching ? <Loading /> :
                labObject.error ? <Error /> :
                    <div className="table-div-lab">
                        <LabTable data={labObject.labMaps} />
                    </div>
        }
    </div>
);

export default connect(state => ({
    labObject: state.labObject
}))(LabResults);
