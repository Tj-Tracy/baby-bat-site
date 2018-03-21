import React, { Component } from "react";
import eatingBat from "./img/bat-eating.gif";
import "./css/base.css";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogin = (username, password) => {
    let body = JSON.stringify({
      username: username,
      password: password
    });

    fetch("/login", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img style={{ margin: "200px" }} src={eatingBat} />
        <input type="text" name="username" onChange={this.handleChange} />
        <input type="password" name="password" onChange={this.handleChange} />
        <button className="btn" onClick={() => this.handleLogin(this.state.username, this.state.password)}>
          Login
        </button>
      </div>
    );
  }
}
export default Home;
