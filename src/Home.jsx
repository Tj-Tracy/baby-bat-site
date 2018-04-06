import React, { Component } from "react";
import eatingBat from "./img/bat-eating.gif";
import "./css/base.css";
import LoginBox from "./LoginBox";
class Home extends Component {
  
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoginBox />
      </div>
    );
  }
}
export default Home;
