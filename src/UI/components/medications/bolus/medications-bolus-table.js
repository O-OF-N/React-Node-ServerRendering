import React from 'react';
import { MedicationTableStyle, MedicationBodyDivStyle } from '../../styles';
import Table from 'rc-table';


const columns = [{
    title: 'Medication', dataIndex: 'medication', key: 'medication', width: '24%',
}, {
    title: 'Dosage', dataIndex: 'dosage', key: 'dosage', width: '24%',
}, {
    title: 'Date', dataIndex: 'date', key: 'date', width: '24%',
}, {
    title: 'Comments', dataIndex: 'comments', key: 'comments', width: '24%'
}];

const BolusMedicationsTable = ({medication}) =>
    <Table columns={columns} data={medication} className="table" />

export default BolusMedicationsTable;
