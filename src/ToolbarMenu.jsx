import React, { Component } from "react";
import './css/ToolbarMenu.css';
import { Link } from 'react-router-dom';

class ToolbarMenu extends Component {
  render() {
    return (
        <div className="flex-outer flex-center">
          <div className="flex-outer flex-row flex-center toolbar">
            <Link className="toolbar-item" to='/parseList'><div>Parses</div></Link>
            <Link className="toolbar-item" to='/profiles'><div>Member Profiles</div></Link>
            <div className="toolbar-item">Baby Bat's Baby Blog</div>
          </div>
        </div>
    );
  }
}

export default ToolbarMenu;
