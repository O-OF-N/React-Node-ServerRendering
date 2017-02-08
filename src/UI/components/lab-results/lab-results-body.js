import React from 'react';

const LabResultValues = ({text, quantity, date, unit}) => (
    <div style={LabValuesStyle}>
        <span style={LabItemsSpanStyle} title={quantity}>{quantity ? quantity : '-'}{unit ? ` ${unit}` : ''}</span>
        <span style={LabItemsSpanStyle} title={date ? new Date(date).toLocaleDateString() : '-'}>{date ? new Date(date).toLocaleString() : '-'}</span>
    </div>
);

const LabResultName = ({code}) => (
    <span style={LabFirstItemsSpanStyle} title={code}>{code ? code : '-'}</span>
);

const LabResultsBody = ({code, labs}) => (
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
)

export default LabResultsBody;

