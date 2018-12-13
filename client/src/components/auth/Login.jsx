import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Consumer } from "../../context-api/Context";
import axios from "axios";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    showError: true
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = (e, change) => {
    e.preventDefault();

    const user = { email: this.state.email, password: this.state.password };
    axios
      .post("/api/users/login", user)
      .then(res => change({ user: res.data, isLogged: true }))
      .catch(errors => {
        console.log(errors)
        this.setState({ showError: true })
      });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { onStateChange, isLogged } = value;
          return isLogged ? (
            <Redirect to="/" />
          ) : (
            <div className="container">
              <div className="card card-container">
                <p id="profile-name" className="profile-name-card" />
                <form
                  className="form-signin"
                  onSubmit={e => this.onSubmitHandler(e, onStateChange)}
                >
                  <span id="reauth-email" className="reauth-email" />
                  <input
                    type="email"
                    name="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email address"
                    required
                    autoFocus
                    value={this.state.email}
                    onChange={this.onChangeHandler}
                  />
                  <input
                    type="password"
                    name="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required
                    value={this.state.password}
                    onChange={this.onChangeHandler}
                  />
                  <div id="remember" className="checkbox">
                    <label>
                      <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block btn-signin"
                  >
                    Sign in
                  </button>
                  {this.state.showError && <p className="invalid">User email or password is incorrect</p> }
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
