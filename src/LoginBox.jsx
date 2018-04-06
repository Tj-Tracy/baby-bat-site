import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/LoginBox.css";
import batIcon from "./img/baby-bat-icon.png";

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
      login: true,
      error: null
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRegister = (username, password, email) => {
    let body = JSON.stringify({
      username: username,
      password: password,
      email: email
    });

    if (username === null) {
      this.setState({ error: "Please enter a username" });
      return;
    }
    if (email === null || email.search('@') === -1) {
      this.setState({ error: "Please enter a valid Email Address" });
      return;
    }
    if (password === null) {
      this.setState({ error: "Please enter a password" });
      return;
    }

    fetch("/register", {
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
        if(data.success) {
          this.handleLogin(username, password);
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({error: "Registration failed"});
      });
    return;
  };

  handleLogin = (username, password) => {
    let body = JSON.stringify({
      username: username,
      password: password
    });

    if (username === null || password === null) {
      this.setState({ error: "Both fields must be filled out" });
      return;
    }

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
        localStorage.setItem('jwtToken', data.jwtToken);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        this.setState({error: "Login Failed"});
      });

    this.setState({ error: null });
  };

  render() {
    if (localStorage.getItem('jwtToken')) {
      return null;
    }
    if (this.state.login === false) {
      return (
        <div
          className="flex-outer flex-column"
          style={{ width: 285, height: 575 }}
        >
          <div className="login-box-container">
            <img src={batIcon} alt="Baby Bat" />
            <p className="form-error">{this.state.error}</p>
            <div>
              <label className="login-label" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                className="login-input"
                name="username"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label className="login-label" htmlFor="email">
                Email Address
              </label>
              <input
                type="text"
                className="login-input"
                name="email"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label className="login-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="login-input"
                name="password"
                onChange={this.handleChange}
              />
            </div>
            <a
              className="link"
              onClick={() => {
                console.log("hi");
                this.setState({ login: !this.state.login, error: null });
              }}
            >
              Login
            </a>
            <button
              className="btn btn-login"
              onClick={() =>
                this.handleRegister(
                  this.state.username,
                  this.state.password,
                  this.state.email
                )
              }
            >
              Register
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="flex-outer flex-column"
          style={{ width: 285, height: 575 }}
        >
          <div className="login-box-container">
            <img src={batIcon} alt="Baby Bat" />
            <p className="form-error">{this.state.error}</p>
            <div>
              <label className="login-label" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                className="login-input"
                name="username"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label className="login-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="login-input"
                name="password"
                onChange={this.handleChange}
              />
            </div>
            <a
              className="link"
              onClick={() => {
                this.setState({ login: !this.state.login, error: null });
                console.log(this.state.login);
              }}
            >
              Register
            </a>
            <button
              className="btn btn-login"
              onClick={() =>
                this.handleLogin(this.state.username, this.state.password)
              }
            >
              Login
            </button>
          </div>
        </div>
      );
    }
  }
}

export default LoginBox;
