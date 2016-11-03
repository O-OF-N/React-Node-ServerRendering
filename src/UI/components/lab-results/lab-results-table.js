import React from 'react';
import Table from 'rc-table';
require('rc-table/assets/index.css');


const columns = [{
lab}, {
    title: 'Dosage', dataIndex: 'dosage', key: 'dosage', width: '33%',
}, {
    title: 'Result', dataIndex: 'result', key: 'result', width: '33%',
}, {
    title: 'Date/Time', dataIndex: 'date', key: 'date', width: '33%'
}];

const LabTable = ({data}) =>
    (<Table columns={columns} data={data} className="table" scroll={{ y: '150' }}/>);

export default LabTable;