import React from 'react';

const MedicationBody = ({data}) => (
    <tbody>
        {data.map(d => buildRows(d))}
    </tbody>
);

const buildRows= data => {
    <tr>
        <td>{data.medication}</td>
        <td>{dateFormat(data.date)}</td>
    </tr>
};

const dateFormat = date => new Date(date).toLocaleString();

export default MedicationBody;