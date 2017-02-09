import React from 'react';
import './medications.css';

const MedicationBody = ({data}) => (
    <tbody>
        {data.map(d => buildRows(d))}
    </tbody>
);

const buildRows = data => (
    <tr>
        <td className="order-details"><span className="medication">{data.ingredients.name}</span>
            <span className="text">{data.dosage}</span>
            <span className="text">{data.comments}</span></td>
        <td className="date data-type-date">{dateFormat(data.date)}</td>
    </tr>
);

const dateFormat = date => new Date(date).toLocaleString();

export default MedicationBody;