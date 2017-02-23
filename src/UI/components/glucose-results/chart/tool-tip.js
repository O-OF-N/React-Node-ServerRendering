const ToolTip = (color, content, title, value) => 
    `<div style= "background-color: ${color} ">
        <table>
            <thead>
                <th>${title}</th>
            </thead>
            <tbody>
                <tr>
                    <td>Source</td>
                    <td>${content}</td>
                </tr>
                <tr>
                    <td>Blood Glucose</td>
                    <td>${value}</td>
                </tr>
            </tbody>
        </table>
    </div>`;

export default ToolTip;