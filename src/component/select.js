import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    borderRadius: "10px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  fixedHeight: {
    height: 230,
    objectFit: "contain",
  },

  input: {
    width: "30vw",
    alignItems: "center",
  },
  win: {
    color: "#219653",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      textAlign: "left",
    },
  },
}));

export default function ViewSelect(props) {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [team, setTeam] = useState("");
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const textPositive = clsx(classes.icon, classes.textPos);
  useEffect(() => {
    setList([
      ...new Set(
        props.data.reduce((a, c) => {
          let str = c.winner;
          a = [...a, str];
          return a;
        }, [])
      ),
    ]);
  }, []);
  const handleChange = (event) => {
    function Ratio(x) {
      let count1 = 0;
      let count2 = 0;
      props.data.map((arr) => {
        if (arr.team1 == x || arr.team2 == x) count1++;
      });
      props.data.map((arr) => {
        arr.winner == x && count2++;
      });
      return Math.round((count2 / count1) * 100);
    }
    setTeam(Ratio(event.target.value));
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">LIST OF TEAM</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
          className={classes.input}
        >
          {list.map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        style={{
          backgroundColor: "#219653",
          margin: "10px 0px",
          color: "white",
        }}
      >
        Winning Percentage of Team: {team}%
      </Button>
    </div>
  );
}
