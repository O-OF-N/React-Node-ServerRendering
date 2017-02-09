import React from 'react';
import { MedicationTableStyle, MedicationBodyDivStyle } from '../styles';
import MedicationsHeader from './medications-header';
import MedicationBody from './medications-body';
import './medications.css';

const MedicationsTable = ({data, title, comments}) => {
    console.log(data);
    console.log(title);
    return (<table className="table-base table-striped">
        <caption><h5 className="header">{title}</h5></caption>
        <MedicationsHeader />
        <MedicationBody data={data} comments={comments} />
    </table>);
}



export default MedicationsTable;
