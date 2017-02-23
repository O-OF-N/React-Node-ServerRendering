import 'c3/c3.css';
import 'd3';
import * as c3 from 'c3/c3';

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
                console.log('d=', d);
                console.log('d[0]=', d[0]);
                console.log('d[0].index=', d[0].index);
                console.log('tt[d[0].index]=', toolTipArray.get(d[0].index));
                const content = toolTipArray[d[0].index];
                return '<div id="tooltip"> Source: ' + content + ' <BR/> Value: ' + d[0].value + '</div>'
            }
        }
    })
};
export default drawChart;
