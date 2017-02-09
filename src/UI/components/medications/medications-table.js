import React from 'react';
import { MedicationTableStyle, MedicationBodyDivStyle } from '../styles';
import MedicationsHeader from './medications-header';
import MedicationBody from './medications-body';


const columns = [{
    title: 'Medication', dataIndex: 'ingredients.name', key: 'medication', width: '33%',
}, {
    title: 'Dosage', dataIndex: 'dosage', key: 'dosage', width: '33%',
}, {
    title: 'Date', dataIndex: 'date', key: 'date', width: '33%',
    render: (date) => dateFormat(date)
}];

const MedicationsTable = ({data, title}) => {
    console.log(data);
    console.log(title);
    return (<table class="table-base table-striped">
        <MedicationsHeader />
        <MedicationBody />
    </table>);
}



export default MedicationsTable;
