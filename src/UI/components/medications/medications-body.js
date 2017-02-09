import React from 'react';
import './medications.css';

const MedicationBody = ({data, comments}) => (
    <tbody>
        {data.map(d => buildRows(d, comments))}
    </tbody>
);

const buildRows = (data, comments) => (
    <tr>
        <td className="order-details"><span className="medication">{data.ingredients.name}</span>
            <span className="text">{data.dosage}</span>
            {comments ? <span className="text"><br />Comments:{data.comments}</span> : null}</td>
        <td className="date data-type-date">{dateFormat(data.date)}</td>
    </tr>
);

const dateFormat = date => new Date(date).toLocaleString();

export default MedicationBody;