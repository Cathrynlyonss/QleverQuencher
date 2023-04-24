import React from 'react';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { db } from '../config/firebase.js'
import { getDatabase, ref, onValue} from "firebase/database";

const database = getDatabase();

var weekData = []
onValue(ref(database, '/prevDays' ), (snapshot) => {
  weekData = [(snapshot.val())];
  parseWeekData();
  if (daysData.size > 7) {
    daysData.shift()
  }
}); 

var sum = 0
var daysData = []
function parseWeekData(){
  for(var i=0; i < weekData.length; i++){
    sum += weekData[i].y[0].y
  }
  daysData.push({x: weekData[0].x, y: sum})
}

function getState(){
  if (weekData !== []) {
    const state = {
      labels: ['Sunday', 'Monday', 'Tuesday',
               'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [
        {
          label: 'Amount of Water Consumed',
          borderWidth: 1,
          // data: [12, 19, 3, 5, 2, 3, 5]
          data: daysData
        }
      ]
    }
    return state
  }else{
    const state = {
      labels: ['Sunday', 'Monday', 'Tuesday',
               'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [
        {
          label: 'Amount of Water Consumed',
          borderWidth: 1,
          data: [12, 19, 3, 5, 2, 3, 5]
          //data: weekData
        }
      ]
    }
    return state
  }
  
  
}


export default class graph extends React.Component {
  render() {
    return (
        <center>
            <div class="chart-wrapper">
                <Bar
                  data={getState()}
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