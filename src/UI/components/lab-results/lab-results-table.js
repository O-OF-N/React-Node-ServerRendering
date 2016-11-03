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

const LabTable = ({data}) => {
    const dataBuilt = buildData(data);
    console.log('here???');
    console.log(dataBuilt);
    return (<Table columns={columns} data={dataBuilt} className="table" scroll={{ y: '150' }} />);
};

const dateFormat = (date) => {
    return { children: new Date(date).toLocaleString(), props: { colSpan: 1, rowSpan: 1 } }
};

const buildData = (data) => data.map(d => {
    let lab1, lab2;
    const code = d.code;
    const labs = d.labs;
    [lab1, lab2] = labs;
    return {
        code: code,
        quantity: lab1.quantity,
        date: lab1.date,
        unit: lab1.unit,
        children: [{
            quantity: lab2.quantity,
            date: lab2.date,
            unit: lab2.unit
        }]
    };
});

export default LabTable;