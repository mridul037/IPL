import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spring } from "react-spring/renderprops";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Chart from "../chart";
import City from "../city";
import Datacard from "../datacard";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import ListData from "../List";
import ViewSelect from "../select";

const useStyles = makeStyles((theme) => ({
  
  heading: {
    color: "#219653",
    textAlign: "center",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    width: "100vw",
    overflow: "auto",
  },
  center:{
    justifyContent:"center",
    margin:"10px 0px"
  },
  row: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  wid: {
    width: "50vw",
    height: 300,
    [theme.breakpoints.down("md")]: {
      width: "100vw",
    },
  },
  wid2: {
    width: 700,
    [theme.breakpoints.down("md")]: {
      width: "100vw",
    },
  },
}));

export default function Home() {
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [year, setYear] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios.get("https://demo0570062.mockable.io/json").then(
      (result) => {
        console.log(result.data);
        setItems(result.data);
        let years = result.data.reduce((map, currentValue) => {
          if (!map.has(currentValue.season)) {
            map.set(currentValue.season, {
              year: currentValue.season,
              totalRun: currentValue.win_by_runs,
              totalWicket: currentValue.win_by_wickets,
            });
          } else {
            const prevValue = map.get(currentValue.season);

            map.set(currentValue.season, {
              ...prevValue,
              totalRun: prevValue.totalRun + currentValue.win_by_runs,
              totalWicket: prevValue.totalWicket + currentValue.win_by_wickets,
            });
          }

          return map;
        }, new Map());

        console.log(years);
        setYear([...years.values()]);
        setIsLoaded(true);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  }, [page]);

  //  function jan(){console.log(x);}
  return (
    <div className={classes.content}>
      {!isLoaded && <LinearProgress />}
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {(props) => (
          <h1 style={props} className={classes.heading}>
            Indian Premier League
          </h1>
        )}
      </Spring>
      
      <Grid container>
        <Grid item conatiner className={classes.row}>
          <Grid item>
            <Paper className={classes.wid}>
              {isLoaded && <Chart data={year} />}
            </Paper>
          </Grid>

          <Grid item style={{ padding: "0px 10px" }}>
            {isLoaded && <Datacard data={items} />}
          </Grid>
        </Grid>
      </Grid>
      <Divider />

      <Grid container>
        <Grid item conatiner className={classes.row}>
          <Grid item xs={18} md={8} lg={6}>
            {isLoaded && <ListData data={items} />}
          </Grid>
          <Grid className={classes.wid2} item >
            {isLoaded && <City data={items} />}
          </Grid>
        </Grid>
      </Grid>
     {/* <div> */}
      <Grid className={classes.center} container >
      {isLoaded && <ViewSelect data={items}/>}
      
       
      </Grid>
      {/* </div> */}
    </div>
  );
}
