import 'c3/c3.css';
import 'd3';
import * as c3 from 'c3/c3';

const drawChart = (labels, data, tt) => c3.generate({
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
    }
});

export default drawChart;
