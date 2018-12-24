import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Consumer } from "../../context-api/Context";
import axios from "axios";
import Modal from "react-modal";

const customStyles = {
  content : {
    zIndex: 1000
  }
};

export default class LoginModal extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    checked: false,
    isOpen: false
  };

  componentDidMount() {
    this.setState(() => ({ isOpen: this.props.isOpen }))
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = (e, change) => {
    e.preventDefault();

    const user = { email: this.state.email, password: this.state.password };
    axios
      .post("/api/users/login", user)
      .then(res => {
        change({ user: res.data, isLogged: true });
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("remember", this.state.checked);
        if (!this.state.checked) {
          localStorage.setItem("remember", this.state.checked);
          const expiration = JSON.stringify(
            new Date().setHours(new Date().getHours() + 1)
          );
          localStorage.setItem("expiration", expiration);
        }
        window.location = "/";
      })
      .catch(errors => {
        this.setState({ errors: errors.response.data });
      });
  };

  render() {
    const { errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { onStateChange, isLogged } = value;
          return isLogged ? (
            <Redirect to="/" />
          ) : (
            <Modal
              isOpen={this.props.isOpen}
              onRequestClose={this.props.onClose}
              contentLabel="Login"
              style={customStyles}
              ariaHideApp={false}
            >
              <div style={{zIndex: 5000000000000}} className="container">
                <div className="card-container login-form">
                  <h2 className="form-header">Log in to continue</h2>

                  <p id="profile-name" className="profile-name-card" />
                  <form
                    className="form-signin"
                    onSubmit={e => this.onSubmitHandler(e, onStateChange)}
                  >
                    <span id="reauth-email" className="reauth-email" />
                    <label htmlFor="inputEmail">Email Address</label>

                    <input
                      type="email"
                      name="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Enter Email"
                      required
                      autoFocus
                      value={this.state.email}
                      onChange={this.onChangeHandler}
                    />
                    <label htmlFor="inputPassword">Password</label>

                    <input
                      type="password"
                      name="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Enter Password"
                      value={this.state.password}
                      onChange={this.onChangeHandler}
                    />
                    {errors.password && (
                      <p className="invalid">{errors.password}</p>
                    )}

                    <div id="remember" className="checkbox">
                      <label>
                        <input
                          onChange={e =>
                            this.setState({ checked: !this.state.checked })
                          }
                          type="checkbox"
                          checked={this.state.checked}
                          value="remember-me"
                        />{" "}
                        Remember me
                      </label>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn-lg btn-primary login-button"
                      >
                        Log in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Modal>
          );
        }}
      </Consumer>
    );
  }
}
