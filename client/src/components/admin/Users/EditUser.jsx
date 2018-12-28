import React, { Component } from "react";
import axios from "axios";
import Success from "../../common/Success";

export default class EditUser extends Component {
  state = {
    username: "",
    email: "",
    balance: 0,
    birthday: "",
    success: false,
    errors: {}
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`/api/users/${id}`).then(res => {
      this.setState({ ...res.data });
    });
  }
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  infoSubmitHandler = e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    let { username, birthday, balance, email } = this.state;

    balance = parseInt(balance);
    axios
      .put(`/api/users/${id}`, {
        username,
        birthday,
        balance,
        email
      })
      .then(res => {
        setTimeout(() => {
          this.setState({ success: true });
        }, 400);
      })
      .catch(err => this.setState({ errors: err.response.data }));
  };

  render() {
    return (
      <main className="container dashboard">
        <div className="row">
          <div className="col-md-12">
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
                            {this.state.username}
                          </h4>
                        </div>
                      </div>
                      <ul className="profile-header-tab nav nav-tabs">
                        <li className="nav-item">
                          <a
                            href="#profile-post"
                            className="nav-link"
                            data-toggle="tab"
                          >
                            About
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#profile-about"
                            className="nav-link active show"
                            data-toggle="tab"
                          >
                            Edit Profile
                          </a>
                        </li>
                      </ul>
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
                                    placeholder={this.state.username}
                                    onChange={this.onChangeHandler}
                                    className="form-control"
                                    type="text"
                                    name="username"
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
                                    placeholder={this.state.email}
                                    onChange={this.onChangeHandler}
                                    name="email"
                                    className="form-control"
                                    type="text"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="field">Balance</td>
                                <td className="form-group">
                                  <input
                                    placeholder={this.state.balance}
                                    onChange={this.onChangeHandler}
                                    name="balance"
                                    className="form-control"
                                    type="number"
                                    min="10"
                                    max="10000000"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="field">Birthdate</td>
                                <td>
                                  <input
                                    placeholder={this.state.birthday}
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
                                    onClick={this.infoSubmitHandler}
                                  >
                                    Update
                                  </button>
                                  {this.state.success && (
                                    <Success
                                      style={{
                                        width: "25px",
                                        marginLeft: "10px",
                                        borderRadius: "15px",
                                        height: "auto"
                                      }}
                                    />
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
