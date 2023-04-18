import React from 'react';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const state = {
  labels: ['Sunday', 'Monday', 'Tuesday',
           'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  datasets: [
    {
      label: 'Amount of Water Consumed',
      borderWidth: 1,
      data: [12, 19, 3, 5, 2, 3, 5]
    }
  ]
}

export default class graph extends React.Component {
  render() {
    return (
        <center>
            <div class="chart-wrapper">
                <Bar
                  data={state}
                  options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                          y: {
                            beginAtZero: true
                          }
                      },
                  }}
                />
            </div>
        </center>
      
    );
  }
}