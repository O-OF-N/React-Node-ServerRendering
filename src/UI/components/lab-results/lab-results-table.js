import React from 'react';
import LabResultsHeader from './lab-results-header';
import LabResultsBody from './lab-results-body';

const LabTable = ({data, title}) => {
  const dataBuilt = buildData(data).toJS();
  console.log('data = ', dataBuilt);
  return (<table className="table-base">
    <caption>
      Last 2 results in past 24 hours
  </caption>
    <LabResultsHeader />
    <LabResultsBody data={dataBuilt} />
  </table>);
};

const dateFormat = (date) => {
  return { children: new Date(date).toLocaleString(), props: { colSpan: 1, rowSpan: 1 } }
};

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

export default LabTable;