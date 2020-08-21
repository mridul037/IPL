import React, { Component } from "react";
//import Grid from "@material-ui/core/Grid";
import "./App.scss";

import Home from "./component/home/home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
