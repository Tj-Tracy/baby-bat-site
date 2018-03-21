import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainMenu from "./MainMenu";
import ParseView from "./ParseView";
import ParseList from "./ParseList";
import Home from "./Home";
import ProfileList from "./ProfileList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" component={MainMenu} />
            <Route exact path="/" component={Home} />
            <Route exact path="/parse/:parseId" component={ParseView} />
            <Route exact path="/parseList" component={ParseList} />
            <Route exact path="/profiles" component={ProfileList} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
