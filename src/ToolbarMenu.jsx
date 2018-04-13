import React, { Component } from "react";
import "./css/ToolbarMenu.css";
import { Link, withRouter } from "react-router-dom";

class ToolbarMenu extends Component {
  constructor(props) {
    super(props);
  }

  logout() {
    localStorage.removeItem("jwt");
    window.location.reload();
  }

  render() {
    return (
      <div className="flex-outer flex-center toolbar">
        <div className="flex-outer flex-row flex-center nav">
          <Link className="toolbar-item" to="/parseList">
            <div>Parses</div>
          </Link>
          <Link className="toolbar-item" to="/profiles">
            <div>Profiles</div>
          </Link>
          <div className="toolbar-item">Baby Bat's Baby Blog</div>
        </div>
        {localStorage.getItem("jwt") !== null ? (
          <a className="toolbar-item" onClick={() => this.logout()}>
            Logout
          </a>
        ) : null}

        <div />
      </div>
    );
  }
}

withRouter(ToolbarMenu);
export default ToolbarMenu;
