import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles((theme) => ({
  heading: {
    color: "#219653",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      textAlign: "left",
    },
  },
  text: {
    fontSize: "1.2rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "12px",
    },
  },
  textContainer: {
    width: 600,
    height: 260,
  },
  gap: {
    margin: "10px 0px",
   [theme.breakpoints.down("md")]: {
      width: "100vw",
    },
  },
}));

export default function Datacard(props) {
  const [win, setWin] = useState();
  const [city, setCity] = useState();
  const [player, setPlayer] = useState();
  const [bat, setBat] = useState();

  useEffect(() => {
    function maxOccur(x) {
      let counts = props.data.reduce((a, c) => {
        a[c[x]] = (a[c[x]] || 0) + 1;
        return a;
      }, {});
      let maxCount = Math.max(...Object.values(counts));
      return Object.keys(counts).filter((k) => counts[k] === maxCount);
    }
    setWin(maxOccur("winner"));
    setCity(maxOccur("city"));
    setPlayer(maxOccur("player_of_match"));
    setBat(maxOccur("toss_decision"));
  }, []);

  const classes = useStyles();
  return (
    <React.Fragment>
      <Box>
        <div className={classes.textContainer}>
          <Button
            style={{
              backgroundColor: "#219653",
              margin: "10px 0px",
              color: "white",
            }}
          >
            {" "}
            FACTS ABOUT IPL
          </Button>
          <Paper className={classes.gap}>
            <Typography
              color="textSecondary"
              component="p"
              variant="h6"
              className={classes.text}
            >
              Team Won Most Matches across all sesason's: {win}
            </Typography>
          </Paper>
          {/* <hr/> */}
          <Paper className={classes.gap}>
            <Typography color="textSecondary" className={classes.text}>
              Most Game were played in City: {city}
            </Typography>
          </Paper>
          {/* <hr/> */}
          <Paper className={classes.gap}>
            <Typography color="textSecondary" className={classes.text}>
              Maximum time declared player of Match : {player}
            </Typography>
          </Paper>
          {/* <hr/> */}
          <Paper className={classes.gap}>
            <Typography color="textSecondary" className={classes.text}>
              Maximum time toss decision choosen was of : {bat}
            </Typography>
          </Paper>
        </div>
      </Box>
    </React.Fragment>
  );
}
