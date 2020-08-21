import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { FixedSizeList } from "react-window";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    borderRadius: "10px",
  },
  point: {
    color: "grey",
  },
  win: {
    color: "#219653",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      textAlign: "left",
    },
  },
}));

export default function ListData(props) {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [winner, setWinner] = useState([]);
  const [venue, setVenue] = useState([]);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const textPositive = clsx(classes.icon, classes.textPos);
  useEffect(() => {
    let v = props.data.reduce((a, c) => {
      let str = c.team1 + " vs " + c.team2;
      a = [...a, str];
      return a;
    }, []);
    setList(v);
    let v1 = props.data.reduce((a, c) => {
      let str = c.winner;
      a = [...a, str];
      return a;
    }, []);
    let v2 = props.data.reduce((a, c) => {
      let str = c.venue;
      a = [...a, str];
      return a;
    }, []);
    setList(v);
    setWinner(v1);
    setVenue(v2);
  }, []);
  const Row = ({ index }) => (
    <div>
      <li className={classes.point}>
        {list[index]}
        <p className={classes.win}>Winner: {winner[index]}</p>
      </li>
      <p className={classes.win}>Venue: {venue[index]}</p>
    </div>
  );
  return (
    <div>
      <h4>List of all matches</h4>
      <FixedSizeList
        height={300}
        width={500}
        itemSize={10}
        itemCount={list.length}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
}
