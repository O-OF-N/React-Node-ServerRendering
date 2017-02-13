import React from 'react';

const buildData = (data) => data.map((d, i) => {
  let lab1, lab2;
  const code = d.code;
  const labs = d.labs;
  [lab1, lab2] = labs;
  return {
    key: i,
    code: code,
    quantity1: lab1.quantity,
    date1: lab1.date,
    unit1: lab1.unit,
    quantity2: lab2.quantity,
    date2: lab2.date,
    unit2: lab2.unit
  };
});

const buildRow = rowData => (<tr>
  <th scope="row">{rowData.code}</th>
  <td>{rowData.quantity1}</td>
  <td>{rowData.quantity2}</td>
</tr>);

const LabResultsHeader = () => (
  <thead>
    <tr>
      <th></th>
      <th scope="col">Latest Result</th>
      <th scope="col">Previous Result</th>
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
    <LabResultsHeader />
    <LabResultsBody data={dataBuilt} />
  </table>);
};

export default LabTable;