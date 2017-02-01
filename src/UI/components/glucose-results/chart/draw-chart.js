import 'c3/c3.css';
import 'd3';
import * as c3 from 'c3/c3';

const drawChart = (labels, data, toolTip) => {
    /*const myChart = new Chart(context, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'BG values',
                lineTension: 0.1,
                pointStyle: 'triangle',
                type: 'line',
                fill:false,
                data: data,
                backgroundColor:'rgba(255, 99, 132, 0.2)',
                borderColor:'rgba(255,99,132,1)',
                borderWidth: 1,
                responsive: true,
                maintainAspectRatio: false,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min:0,
                        max:500
                    }
                }]
            }
        }
    });*/
    var chart = c3.generate({
        bindto: '#chart',
        data: {
            columns: [
                data
            ]
        }
    })
};

export default drawChart;
