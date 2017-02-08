import React from 'react';
import { MedicationTableStyle, MedicationBodyDivStyle } from '../styles';
import MedicationsHeader from './medications-header';


const columns = [{
    title: 'Medication', dataIndex: 'ingredients.name', key: 'medication', width: '33%',
}, {
    title: 'Dosage', dataIndex: 'dosage', key: 'dosage', width: '33%',
}, {
    title: 'Date', dataIndex: 'date', key: 'date', width: '33%',
    render: (date) => dateFormat(date)
}];

const MedicationsTable = ({data, title}) =>{
    console.log(data);
    console.log(title);
    return (<table class="table-base table-striped">
        <MedicationsHeader />
    </table>);
}

const dateFormat = (date) => {
    return { children: new Date(date).toLocaleString(), props: { colSpan: 1, rowSpan: 1 } }
};

export default MedicationsTable;
