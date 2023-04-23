import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";

getData();
const state = {
  datasets: [
    {
      label: "Amount of Water Consumed",
      borderWidth: 1,
      data: [
        { x: "2020-02-15 18:37:39", y: 8.25 },
        { x: "2020-02-15 06:37:39", y: 18.25 },
      ],
    },
  ],
};

//functions to read in data from firestore
async function getData() {
  const docRef = doc(db, "Users", "lyonsc20");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
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
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Amount of Water Consumed",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Hours",
                  },
                  type: "time",
                  time: {
                    unit: "hour",
                  },
                },
              },
            }}
          />
        </div>
      </center>
    );
  }
}
