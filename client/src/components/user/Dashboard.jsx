import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Consumer } from "../../context-api/Context";
import axios from "axios";

export default class Dashboard extends Component {
  state = {
    star: 0,
    reviewText: "",
    username: "",
    email: "",
    balance: 0,
    birthday: "",
    errors: {}
  };
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = (e, id) => {
    e.preventDefault();
    let { star, reviewText } = this.state;

    star = parseInt(star);
    axios
      .post(`/api/admin/review/${id}`, { star, reviewText })
      .then(res => {
        console.log();
      })
      .catch(err => this.setState({ errors: err.response.data }));
  };

  infoSubmitHandler = (e, value) => {
    e.preventDefault();
    let { username, birthday, balance, email } = this.state;

    balance = parseInt(balance);
    axios
      .put(`/api/users/${value.user.id}`, {
        username,
        birthday,
        balance,
        email
      })
      .then(res => {
        let user = value.user;
        user = {
          ...user,
          ...res.data
        };
        value.onStateChange({ user });
        user = JSON.parse(localStorage.getItem("user"));
        user = {
          ...user,
          ...res.data
        };
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch(err => this.setState({ errors: err.response.data }));
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { user } = value;
          return user.username ? (
            <main className="container dashboard">
              <div className="row">
                <div className="col-md-12 user-dashboard__header">
                  <div className="row">
                    <div className="col-md-12">
                      <div id="content" className="content content-full-width">
                        <div className="profile">
                          <div className="profile-header">
                            <div className="profile-header-cover" />
                            <div className="profile-header-content">
                              <div className="profile-header-img">
                                <img
                                  src="http://bootdey.com/img/Content/avatar/avatar7.png"
                                  alt=""
                                />
                              </div>
                              <div className="profile-header-info">
                                <h4 className="m-t-10 m-b-5">
                                  {value.user.username}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="profile-content">
                          <div className="tab-content p-0">
                            <div
                              className="tab-pane fade in active show"
                              id="profile-about"
                            >
                              <div className="table-responsive">
                                <table className="table table-profile">
                                  <thead>
                                    <tr>
                                      <th />
                                      <th>
                                        <h4>
                                          <small>
                                            Update Your Personal Information
                                          </small>
                                        </h4>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="highlight">
                                      <td className="field">Username</td>
                                      <td className="form-group">
                                        <input
                                          onChange={this.onChangeHandler}
                                          className="form-control"
                                          type="text"
                                          name="username"
                                          placeholder={value.user.username}
                                        />
                                      </td>
                                    </tr>
                                    <tr className="divider">
                                      <td colSpan="2" />
                                    </tr>
                                    <tr>
                                      <td className="field">Email</td>
                                      <td className="form-group">
                                        <input
                                          onChange={this.onChangeHandler}
                                          name="email"
                                          className="form-control"
                                          type="text"
                                          placeholder={value.user.email}
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="field">Balance</td>
                                      <td className="form-group">
                                        <input
                                          onChange={this.onChangeHandler}
                                          name="balance"
                                          className="form-control"
                                          type="number"
                                          min="10"
                                          max="10000000"
                                          placeholder={value.user.balance}
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="field">Birthdate</td>
                                      <td>
                                        <input
                                          type="date"
                                          onChange={this.onChangeHandler}
                                          name="birthday"
                                        />
                                      </td>
                                    </tr>
                                    <tr className="divider">
                                      <td colSpan="2" />
                                    </tr>
                                    <tr className="highlight">
                                      <td className="field">&nbsp;</td>
                                      <td className="p-t-10 p-b-10">
                                        <button
                                          type="submit"
                                          className="btn btn-primary width-150"
                                          onClick={e =>
                                            this.infoSubmitHandler(e, value)
                                          }
                                        >
                                          Update
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 mb-3 dashboard-textarea">
                              <form
                                onSubmit={e =>
                                  this.onSubmitHandler(e, value.user.id)
                                }
                              >
                                <div className="feedback">
                                  <b>Give SecondChance your feedback</b>
                                  <textarea
                                    onChange={this.onChangeHandler}
                                    name="reviewText"
                                    placeholder={
                                      value.user.reviewText
                                        ? value.user.reviewText
                                        : "Leave your feedback"
                                    }
                                    required
                                    rows="4"
                                  />
                                  {this.state.errors.reviewText && (
                                    <p className="invalid">
                                      this.state.errors.reviewText
                                    </p>
                                  )}
                                  <button className="btn">
                                    {value.user.reviewText
                                      ? "Edit Review"
                                      : "Submit Review"}
                                  </button>
                                </div>
                                <div className="rating">
                                  <input
                                    type="radio"
                                    name="star"
                                    id="star1"
                                    value="5"
                                    onChange={this.onChangeHandler}
                                  />
                                  <label htmlFor="star1" />
                                  <input
                                    type="radio"
                                    name="star"
                                    id="star2"
                                    value="4"
                                    onChange={this.onChangeHandler}
                                  />
                                  <label htmlFor="star2" />
                                  <input
                                    type="radio"
                                    name="star"
                                    id="star3"
                                    value="3"
                                    onChange={this.onChangeHandler}
                                  />
                                  <label htmlFor="star3" />
                                  <input
                                    type="radio"
                                    name="star"
                                    id="star4"
                                    value="2"
                                    onChange={this.onChangeHandler}
                                  />
                                  <label htmlFor="star4" />
                                  <input
                                    type="radio"
                                    name="star"
                                    id="star5"
                                    value="1"
                                    onChange={this.onChangeHandler}
                                  />
                                  <label htmlFor="star5" />
                                </div>
                                {this.state.errors.star && (
                                  <p className="invalid">
                                    {this.state.errors.star}
                                  </p>
                                )}
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          ) : (
            <Redirect to="/login" />
          );
        }}
      </Consumer>
    );
  }
}
