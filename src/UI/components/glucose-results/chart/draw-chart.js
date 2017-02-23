import 'c3/c3.css';
import 'd3';
import * as c3 from 'c3/c3';
import Tooltip from './tool-tip';

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
                console.log('color=', color(d[0].id));
                console.log('defaultTitleFormat=', defaultTitleFormat(d[0].x));
                console.log('defaultValueFormat=', defaultValueFormat(d[0].value, d[0].ratio, d[0].id, d[0].index));
                const content = toolTipArray.get(d[0].index);
                const bgColor = color(d[0].id);
                const title = defaultTitleFormat(d[0].x);
                const value = defaultValueFormat(d[0].value, d[0].ratio, d[0].id, d[0].index);
                return Tooltip(bgColor,content,title,value)
            }
        }
    })
};
export default drawChart;
