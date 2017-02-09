import React from 'react';

const MedicationBody = ({data}) => (
    <tbody>
        {data.map(d => buildRows(d))}
    </tbody>
);

const buildRows = data => (
    <tr>
        <td>{data.medication}</td>
        <td className="data-type-date">{dateFormat(data.date)}</td>
    </tr>
);

const dateFormat = date => new Date(date).toLocaleString();

export default MedicationBody;