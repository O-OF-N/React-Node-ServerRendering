import 'c3/c3.css';
import 'd3';
import * as c3 from 'c3/c3';

const drawChart = (labels, data, toolTip) => {
    var chart = c3.generate({
        bindto: '#chart',
        data: {
            x: 'x',
            columns: [
                labels,
                data
            ],
            type: 'spline'
        },
        axis: {
            x: {
                type: 'category' // this needed to load string x value
            }
        }
    })
};

export default drawChart;
