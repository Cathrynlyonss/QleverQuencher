import React from 'react';
import {Line} from 'react-chartjs-2';
// import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import { db } from '../config/firebase.js'
import { getDatabase, ref, onValue, update, child, get} from "firebase/database";
// import { reload } from 'firebase/auth';
// import { render } from '@testing-library/react';
import { addToGraph, removeFromGraph } from './weekly.js';

const database = getDatabase();
var dailyData = [];
var dailySum = 0;

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

var day = ""
//get initial value for day
const dbRef = ref(getDatabase());
get(child(dbRef, `dayofweek`)).then((snapshot) => {
  if (snapshot.exists()) {
    day = daysOfWeek[snapshot.val()]
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

//when more water has been consumed
onValue(ref(database, '/waterConsumption' ), (snapshot) => {
    dailyData.push(snapshot.val());

    //add to weekly bar graph for that day
    addToGraph(day, dailySum)

}); 

// onValue(ref(database, '/dayofweek' ), (snapshot) => {
//     prevDays = {x: daysOfWeek[snapshot.val()-1], y: data};
//     data = [];

//     var updates = {}
//     updates['/prevDays'] = prevDays
//     update(ref(database), updates)
// }); 


onValue(ref(database, '/dayofweek' ), (snapshot) => {
    day = daysOfWeek[snapshot.val()]
    dailyData = []

    //tell weekly to set new day data to 0
    removeFromGraph(snapshot.val())
});

function getState(){
    const state = {
        datasets: [
          {
            label: 'Amount of Water Consumed',
            borderWidth: 1,
            //data: [{x: Date.now(), y: data}]
            data: dailyData
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


