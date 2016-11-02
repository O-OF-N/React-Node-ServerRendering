import Chart from 'chart.js'

const drawChart = (context, labels, data) => {
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
            scales: {
                labelString: "texting",
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
