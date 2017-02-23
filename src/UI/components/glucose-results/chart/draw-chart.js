import 'c3/c3.css';
import 'd3';
import * as c3 from 'c3/c3';

const ToolTip = (color, content, title, value) =>
    `<div style= "color: white">
        <table style= "border: 1px solid;background-color: ${color};border-color:white ">
            <thead>
                <th style= "border: 1px solid;border-right:0px">${title}</th>
                <th style= "border: 1px solid;border-left:0px"></th>
            </thead>
            <tbody >
                <tr>
                    <td style= "border: 1px solid;">Source</td>
                    <td style= "border: 1px solid;">${content}</td>
                </tr>
                <tr>
                    <td style= "border: 1px solid;">Blood Glucose</td>
                    <td style= "border: 1px solid;">${value}</td>
                </tr>
            </tbody>
        </table>
    </div>`;

const drawChart = (labels, data, toolTipArray) => {
    return c3.generate({
        bindto: '#chart',
        padding: {
            top: 40,
            right: 100,
            bottom: 40,
            left: 100,
        },
        data: {
            x: 'x',
            type: 'spline',
            columns: [
                labels,
                data
            ]
        },
        grid: {
            y: {
                show: true
            }
        },
        axis: {
            x: {
                type: 'category'
            },
            y: {
                label: {
                    text: 'Glucose Level (mg/dl)',
                    position: 'outer-middle'
                }
            }
        },
        tooltip: {
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
                const tooltip = toolTipArray.get(d[0].index);
                const content = tooltip.source;
                const bgColor = color(d[0].id);
                const title = tooltip.date;
                const value = defaultValueFormat(d[0].value, d[0].ratio, d[0].id, d[0].index);
                return ToolTip(bgColor, content, title, value)
            }
        }
    })
};
export default drawChart;
