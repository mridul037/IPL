import React, { PureComponent } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  Label,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  ResponsiveContainer
} from 'recharts';



export default class City extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/mc8r7e6p/";
  constructor(props){
       super(props);
       this.state={
           data:props.data,
           city:[]
       }
       this.fun=this.fun.bind(this);
  }
   fun(){
   return [...this.state.data.reduce(
            (map, currentValue) => {
                if(!map.has(currentValue.city)) {
                    map.set((currentValue.city), {
                      name:currentValue.city,
                      total: 0,
                    });
                  } else {
                    const prevValue = map.get(currentValue.city);
                   
                    map.set((currentValue.city), {
                      ...prevValue,
                      total: prevValue.total+ 1 
                    });
                  }
                  return map;
        },new Map()).values()]
    
       
  }

  render() {
      
    return (
     < ResponsiveContainer>
      <ComposedChart
        width={700}
        height={400}
        data={this.fun()}
        barSize={10}
        margin={{
          top: 0,
          right: 20,
          left: 5,
          bottom: 75,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3" />
        <XAxis fontSize="10px" dataKey="name">
          <Label
            value="City"
            fontSize="10px"
            offset={0}
            position="insideBottom"
          />
        </XAxis>
        <YAxis fontSize="10px">
          <Label
            value="Total Matches"
            fontSize="10px"
            angle="-90"
            offset={0}
            position="insideLeft"
          />
        </YAxis>
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
        <ReferenceLine y={0} stroke="#000" />
        <Line
          dataKey="City"
          strokeWidth="2px"
          stroke="#FDC132"
          strokeDasharray="3 3"
        />
        <Bar dataKey="total" fill="#38C976" />
      </ComposedChart>
     </ ResponsiveContainer>
    );
  }
}
