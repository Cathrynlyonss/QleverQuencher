import React from 'react';
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';

const state = {
  datasets: [
    {
      label: 'Amount of Water Consumed',
      borderWidth: 1,
      data: [{x: "2020-02-15 18:37:39", y: 8.25},{x: "2020-02-15 06:37:39", y: 18.25}]
    }
  ]
}

export default class graph extends React.Component {
  render() {
    return (
        <center>
            <div class="chart-wrapper">
                <Line
                    data={state}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true
                            },
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'hour'
                                }
                            }
                        },
                    }}
                />
            </div>
        </center>
      
    );
  }
}