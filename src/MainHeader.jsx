import React, { Component } from "react";
import ToolbarMenu from "./ToolbarMenu";
import batIcon from './img/bigger-bat-white.png';
import { Link } from 'react-router-dom';

class MainHeader extends Component {
  render() {
    return (
      <div className="outer-main-container flex-column flex-outer">
        <div className="site-header">
          <Link to='/' ><img src={batIcon} style={{ height: 80, width: 80 }} /> </Link>
          <h1>GOOD LUCK BABY BAT</h1>
        </div>
        <div className="sub-header">
          <ToolbarMenu />
        </div>
      </div>
    );
  }
}

export default MainHeader;
