import React from 'react';
import { MedicationTableStyle, MedicationBodyDivStyle } from '../styles';
import Table from 'rc-table';
require('rc-table/assets/index.css');


const columns = [{
    title: 'Medication', dataIndex: 'medication', key: 'medication', width: '24%',
}, {
    title: 'Dosage', dataIndex: 'dosage', key: 'dosage', width: '24%',
}, {
    title: 'Date', dataIndex: 'date', key: 'date', width: '24%',
}];

const MedicationsTable = ({data}) =>
    (<Table columns={columns} data={data} className="table" scroll={{ y: '50%' }}/>);

export default MedicationsTable;
