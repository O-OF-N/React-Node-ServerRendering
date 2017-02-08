import React from 'react';

const buildRow = rowData => <tr>
    <th scope="row">{rowData.code}</th>
    <td>{rowData.quantity1}</td>
    <td>{rowData.quantity2}</td>
</tr>

const LabResultsBody = ({data}) => (
    <tbody>
        {data.map(d1 => buildRow(d1))}
    </tbody>
)

export default LabResultsBody;

