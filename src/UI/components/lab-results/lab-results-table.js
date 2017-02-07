import React from 'react';
import Table from 'rc-table';
require('rc-table/assets/index.css');


const columns = [{
    title: 'Lab', dataIndex: 'code', key: 'code', width: '24%',
}, {
    title: 'Result', dataIndex: 'quantity', key: 'quantity', width: '24%',
}, {
    title: 'Date', dataIndex: 'date', key: 'date', width: '24%',
    render: (date) => dateFormat(date)
}];

const LabTable = ({data,title}) => {
    //const dataBuilt = buildData(data).toJS();
    return (<table class="table-base" summary="An example of the base table styles with row headings.">
  <caption>
    With row headings (tbody th pattern)
  </caption>
  <thead>
    <tr>
      <th></th>
      <th scope="col">Column Heading</th>
      <th scope="col">Column Heading</th>
      <th scope="col">Column Heading</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Row Heading</th>
      <td>Content</td>
      <td>Content</td>
      <td>Content</td>
    </tr>
    <tr>
      <th scope="row">Row Heading</th>
      <td>Content</td>
      <td>Content</td>
      <td>Content</td>
    </tr>
    <tr>
      <th scope="row">Row Heading</th>
      <td>Content</td>
      <td>Content</td>
      <td>Content</td>
    </tr>
  </tbody>
</table>);
};

const dateFormat = (date) => {
    return { children: new Date(date).toLocaleString(), props: { colSpan: 1, rowSpan: 1 } }
};

const buildData = (data) => data.map((d,i) => {
    let lab1, lab2;
    const code = d.code;
    const labs = d.labs;
    [lab1, lab2] = labs;
    return {
        key: i,
        code: code,
        quantity: lab1.quantity,
        date: lab1.date,
        unit: lab1.unit,
        children: [{
            key: i+1000,
            code: '',
            quantity: lab2.quantity,
            date: lab2.date,
            unit: lab2.unit
        }]
    };
});

export default LabTable;