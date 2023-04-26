import React from 'react';
import {Line} from 'react-chartjs-2';
// import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import { db } from '../config/firebase.js'
import { getDatabase, ref, onValue, update, child, get} from "firebase/database";
// import { reload } from 'firebase/auth';
// import { render } from '@testing-library/react';
import { addToGraph, removeFromGraph } from './weekly.js';
import { generateFakeDailyData } from '../components/generateFakeData.js';
import { fakeDailySum } from '../components/generateFakeData.js';

const database = getDatabase();

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

var day = ""
var dailyData = [] //generateFakeDailyData();
var dailySum = 0

const dbRef = ref(getDatabase());
//get initial value for day for when server first starts up
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
  console.log(snapshot.val())
  if (snapshot.val().y >= 0){
    dailyData.push(snapshot.val());
      
    //add to weekly bar graph for that day
    dailySum += snapshot.val().y
    addToGraph(day, snapshot.val().y)
  }
}); 

onValue(ref(database, '/dayofweek' ), (snapshot) => {
    day = daysOfWeek[snapshot.val()]
    dailyData = []

    //tell weekly to set new day data to 0
    //removeFromGraph(snapshot.val())
});

//function so that graph can change dynamically
function getState(){
  console.log(dailyData)
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
                                ticks: {
                                  beginAtZero:true,
                                  callback: function(value, index, values) {
                                          return value + 'oz';
                                  }
                              },
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
            <div>
              <h2>
                Total Daily Consumption: { dailySum } oz.
              </h2>
            </div>
        </center>
    );
  }
}


