import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
    ResponsiveContainer
  } from 'recharts';

export default class Chart extends React.Component {
    constructor(props){
        super(props);
      
        this.state={
            data:props.data,
        }
      console.log(props.data);
    }
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/xqjtetw0/";

  render() {
    return (
    <ResponsiveContainer>
      <LineChart
        width={600}
        height={300}
        data={this.state?.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="totalRun"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="totalWicket" stroke="#82ca9d" />
      </LineChart>
      </ResponsiveContainer>
    );
  }
}
