import Chart from 'chart.js'

const drawChart = (context, labels, data) => {
    const myChart = new Chart(context, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Glucose',
                type: 'line',
                fill:false,
                data: data,
                backgroundColor:
                'rgba(255, 99, 132, 0.2)',
                borderColor:
                'rgba(255,99,132,1)',
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
                        max:250
                    }
                }]
            }
        }
    });
};

export default drawChart;
