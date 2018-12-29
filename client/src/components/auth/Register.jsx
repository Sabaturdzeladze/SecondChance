import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Consumer } from "../../context-api/Context";

export default class Register extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    password2: "",
    birthday: "",
    balance: 0,
    errors: {}
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.setState({errors: {}})
    const {
      email,
      password,
      password2,
      username,
      birthday,
      balance
    } = this.state;

    const user = { email, password, username, birthday, balance, password2 };

    axios
      .post("/api/users/register", user)
      .then(res => {
        this.props.history.push("/login");
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({ errors: err.response.data });
      });
  };

  render() {
    const { errors } = this.state;
    return (
      <Consumer>
        {value =>
          value.isLogged ? (
            <Redirect to="/" />
          ) : (
            <>
              <h2 className="form-header">Register New Account</h2>

              <form
                onSubmit={this.onSubmitHandler}
                className="user-registration-form"
              >
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail">Email</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-envelope fa" aria-hidden="true" />
                        </div>
                      </div>

                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail"
                        name="email"
                        placeholder="test@email.com"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                      />
                    </div>
                    {errors.email && <span className="invalid">{errors.email}</span>}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inlineFormInputGroupUsername">
                      Username
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-user fa" aria-hidden="true" />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="inlineFormInputGroupUsername"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.onChangeHandler}
                      />
                    </div>
                    {errors.username && (
                      <span className="invalid">{errors.username}</span>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPassword1">Password</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-lock fa" aria-hidden="true" />
                        </div>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword1"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                      />
                    </div>
                    {errors.password && (
                      <span className="invalid">{errors.password}</span>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPassword2">Confirm Password</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-lock fa" aria-hidden="true" />
                        </div>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword2"
                        name="password2"
                        placeholder="Confirm Password"
                        value={this.state.password2}
                        onChange={this.onChangeHandler}
                      />
                    </div>
                    {errors.password2 && (
                      <span className="invalid">{errors.password2}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="formGroupExampleInput1">
                      Date of Birth
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fas fa-calendar" aria-hidden="true" />
                        </div>
                      </div>
                      <input
                        type="date"
                        className="form-control"
                        id="formGroupExampleInput1"
                        placeholder="Date of Birth"
                        name="birthday"
                        value={this.state.birthday}
                        onChange={this.onChangeHandler}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="formGroupExampleInput2">Balance</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i
                            className="fas fa-dollar-sign"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput2"
                        name="balance"
                        placeholder="1000"
                        value={this.state.balance}
                        onChange={this.onChangeHandler}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-12 text-center">
                  <button
                    type="submit"
                    className="btn-lg btn-primary register-button"
                  >
                    Register
                  </button>
                </div>
              </form>
            </>
          )
        }
      </Consumer>
    );
  }
}
