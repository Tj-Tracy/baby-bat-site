import React, { Component } from "react";
import ParseList from "./ParseList";
import ParseView from "./ParseView";
import MainHeader from "./MainHeader";
import "./css/MainMenu.css";
import "./css/base.css";
import ToolbarMenu from "./ToolbarMenu";




class MainMenu extends Component {
  constructor(props) {
    super(props);
  }

 
 

  render() {
    return (
      <div style={{position:"fixed"}} className="outer-main-container flex-column flex-outer">
        <MainHeader />
      </div>
    );
  }
}

export default MainMenu;
