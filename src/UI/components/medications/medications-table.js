import React from 'react';
import { MedicationTableStyle, MedicationBodyDivStyle } from '../styles';
import MedicationsHeader from './medications-header';
import MedicationBody from './medications-body';


const MedicationsTable = ({data, title}) => {
    console.log(data);
    console.log(title);
    return (<table className="table-base table-striped">
        <caption><h5>{title}</h5></caption>
        <MedicationsHeader />
        <MedicationBody data={data} />
    </table>);
}



export default MedicationsTable;
