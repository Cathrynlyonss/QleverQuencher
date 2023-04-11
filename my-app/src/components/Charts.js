import React from "react";
import loading from '../loading.svg';
import './Charts.css';

import {
    LineChart,
    BarChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

class BChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const yTicker = this.props.yAxisTick;
    return (
      <div className="Chart">
        <BarChart
          width={800} 
          height={400}
          data={this.props.data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="key" />
          <YAxis tickFormatter={yTicker}/>
          <Tooltip />
          <Legend />
          <Bar name={this.props.xname[0]} dataKey='consumption' fill='rgba(233,146,19,0.9)'/>
          <Bar name={this.props.xname[1]} dataKey='production' fill='rgba(50,50,50,0.9)'/>
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </BarChart>
      </div>
    );
  }
}

class LChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const yTicker = this.props.yAxisTick;
    return (
      <div className="Chart">
        <LineChart
          width={800} 
          height={400}
          data={this.props.data}
          margin={{
            top: 5,
            right: 40,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="key" />
          <YAxis tickFormatter={yTicker}/>
          <Tooltip />
          <Legend />
          <Line name={this.props.xname[0]} type="monotone" dataKey='consumption' stroke='rgba(233,146,19,0.9)' dot={false}/>
          <Line name={this.props.xname[1]} type="monotone" dataKey='production' stroke='rgba(50,50,50,0.9)' dot={false}/>
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </div>
    );
  }
}

function BuildingChart(props) {
  if(props.loading) {
    return (
      <div className="Chart">
        <img src={loading} className="Chart-loading" alt="" />
        <div>Loading data...</div>
      </div>
    );
  } 
  
  if(props.type === 'bar') {
    return <BChart {...props} />;
  } else {
    return <LChart {...props} />;
  }
}

export {BChart, LChart, BuildingChart};