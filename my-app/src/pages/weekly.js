import React from 'react';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { db } from '../config/firebase.js'
import { getDatabase, ref, onValue} from "firebase/database";
import { generateFakeData } from '../components/generateFakeData.js'

const database = getDatabase();

var weekData = generateFakeData();
var daysData = parseFakeData();

var realWeekData = [];

onValue(ref(database, '/prevDays' ), (snapshot) => {
  realWeekData.push([(snapshot.val())]);
  if (daysData.size > 7) {
    daysData.shift()
  }
}); 

function parseFakeData(){
  var dayData = []
  var sum = 0
  var day = ""
  
  for(var i=0; i < weekData.length; i++){
    sum = 0;
    for(var j = 0; j< weekData[i].length; j++){
      sum += weekData[i][j].y
      day = weekData[i][j].x
    }
    dayData.push({x: day, y: sum})
  }

  return dayData
}

function getState(){
  if (weekData.length !== 0) {
    const state = {
      labels: ['Sunday', 'Monday', 'Tuesday',
               'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [
        {
          label: 'Amount of Water Consumed',
          borderWidth: 1,
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
          data: [0, 0, 0, 0, 0, 0, 0]
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