import React from 'react';
import './lab-results.css';

const buildData = (data) => data.map((d, i) => {
  let lab1, lab2;
  const code = d.code;
  const labs = d.labs;
  [lab1, lab2] = labs;
  return {
    key: i,
    code: code,
    quantity1: lab1 ? lab1.quantity : '-',
    date1: lab1 ? dateFormat(lab1.date) : '-',
    unit1: lab1 ? lab1.unit : '-',
    quantity2: lab2 ? lab2.quantity : '-',
    date2: lab2 ? dateFormat(lab2.date) : '-',
    unit2: lab2 ? lab2.unit : '-'
  };
});

const dateFormat = date => new Date(date).toLocaleString();

const buildRow = rowData => (<tr>
  <th scope="row" className="table-code">{rowData.code}</th>
  <td title={rowData.date1} className="table-content">{rowData.quantity1?rowData.quantity1:'-'}</td>
  <td title={rowData.date2} className="table-content">{rowData.quantity2?rowData.quantity2:'-'}</td>
</tr>);

const LabResultsHeader = () => (
  <thead>
    <tr>
      <th></th>
      <th scope="col" className="table-content">Latest Result</th>
      <th scope="col" className="table-content">Previous Result</th>
    </tr>
  </thead>
);

const LabResultsBody = ({data}) => (
  <tbody>
    {data.map(d1 => buildRow(d1))}
  </tbody>
);


const LabTable = ({data, title}) => {
  const dataBuilt = buildData(data).toJS();
  return (<table className="table-base">
    <caption className="caption"><h5 className="caption-header">Last 2 results in past 24 hours</h5></caption>
    <LabResultsHeader />
    <LabResultsBody data={dataBuilt} />
  </table>);
};

export default LabTable;