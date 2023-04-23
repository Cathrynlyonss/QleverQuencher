import React from 'react';
import {Line} from 'react-chartjs-2';
// import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import { db } from '../config/firebase.js'
import { getDatabase, ref, onValue, update} from "firebase/database";
// import { reload } from 'firebase/auth';
// import { render } from '@testing-library/react';


const database = getDatabase();

const amountRef = ref(database, '/hi' );    
var data = []
var prevDays = []

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday',
'Wednesday', 'Thursday', 'Friday', 'Saturday']

onValue(ref(database, '/waterConsumption' ), (snapshot) => {
    data.push(snapshot.val());
    console.log(data)
}); 

onValue(ref(database, '/dayofweek' ), (snapshot) => {
    prevDays = {x: daysOfWeek[snapshot.val()-1], y: data};
    data = [];

    var updates = {}
    console.log(prevDays)
    updates['/prevDays'] = prevDays
    update(ref(database), updates)
}); 

function getState(){
    const state = {
        datasets: [
          {
            label: 'Amount of Water Consumed',
            borderWidth: 1,
            //data: [{x: Date.now(), y: data}]
            data: data
          }
        ]
    }
    return state
}

export default class graph extends React.Component {
  render() {
    return (
        <center>
            <div class="chart-wrapper">
                <Line
                    data={getState()}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Amount of Water Consumed'
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Hours'
                                },
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


