import React, { Component } from "react";
// import history from '../common/history';
import { Consumer } from "../../context-api/Context";

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        isLogged: false,
        value: {}
    }

    changeLocalState = (value) => {
        this.setState({ value });
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler = (e,change) => {
        e.preventDefault();

        console.log(change)
    }
    
  render() {
    return (
      <Consumer>
          {
            value => {
                const {onStateChange} = value;
                // this.changeLocalState(value);
                return (
                <div className="container">
                <div className="card card-container">
                  <p id="profile-name" className="profile-name-card" />
                  <form className="form-signin" onSubmit={(e) => this.onSubmitHandler(e, onStateChange)}>
                    <span id="reauth-email" className="reauth-email" />
                    <input
                      type="email"
                      name="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email address"
                      required
                      autoFocus
                      onChange={this.onChangeHandler}
                    />
                    <input
                      type="password"
                      name="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      required
                      onChange={this.onChangeHandler}
                    />
                    <div id="remember" className="checkbox">
                      <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                      </label>
                    </div>
                    <button
                      className="btn btn-lg btn-primary btn-block btn-signin"
                    //   type="submit"
                    >
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
              )
            }
          }
      </Consumer>
    );
  }
}
