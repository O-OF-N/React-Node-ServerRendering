import 'c3/c3.css';
import 'd3';
import * as c3 from 'c3/c3';

const drawChart = (labels, data, tt) => {
    var chart = c3.generate({
        bindto: '#chart',
        padding: {
            top: 40,
            right: 100,
            bottom: 40,
            left: 100,
        },
        data: {
            x: 'x',
            columns: [
                labels,
                data
            ]
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
            format: {
                title: (x) => {
                    const toolTip = tt.find(t => t.index === x);
                    console.log(`${toolTip.toolTipDate}(${toolTip.source})`);
                    return `${toolTip.toolTipDate}(${toolTip.source})`
                },
                value: (value, ratio, id, index) => value
            }
        }
    });
};

export default drawChart;
