import Chart from 'chart.js'

const drawChart = (context, labels, data, toolTip) => {
    const myChart = new Chart(context, {
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
            legend: {
            display: true,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            },
            tooltips :{
                title: (tooltipItem,data)=> {
                    console.log(tooltipItem);
                    return toolTip.filter(d => d.data === data);
                }
            },
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
    });
};

export default drawChart;
