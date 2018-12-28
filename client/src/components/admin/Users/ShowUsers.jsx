import React, { Component } from "react";
import User from "./User";
import axios from "axios";

export default class ShowUsers extends Component {
  state = {
    users: [],
    filtered: false,
  };
  onChangeHandler = (e, users) => {
    let input = e.target.value.toLowerCase();
    if (!input) {
      axios
      .get("/api/users/all/list")
      .then(res => {
        this.setState(() => ({ users: res.data.slice(1), filtered: false}));
        // Get users array from response data, for deleting input
      })
      .catch(err => console.log(err.response.data));
    } else {
      users = users.filter(user => {
        if (user.username && user.username.toLowerCase().includes(input)) return true;
        return false;
      });
      this.setState(() => ({ users, filtered: true }));
    }
  };
  onDeleteHandler = id => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`/api/admin/users/${id}`)
        .then(res => {
          this.setState({ users: res.data });
        })
        .catch(err => console.log(err));
    }
  };
  componentDidMount() {
    axios
      .get("/api/users/all/list")
      .then(res => {
        this.setState({ users: res.data.slice(1) });
        // Remove Admin from users
      })
      .catch(err => console.log(err.response.data));
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9" style={{ margin: "0 auto 40px" }}>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2 border-right">
                    <h4 style={{ textAlign: "center" }}>Users</h4>
                  </div>
                </div>
                <label style={{ width: "100%" }} htmlFor="filter">
                    Filter By Username <br />
                    <input
                      style={{ width: "100%" }}
                      onChange={e => this.onChangeHandler(e, this.state.users)}
                      type="text"
                      name="filter"
                      placeholder="Search for users"
                    />
                  </label>
                <div className="row">
                  <div className="col-md-12">
                    <table className="table table-hover ">
                      <thead className="bg-light ">
                        <tr>
                          <th>Username</th>
                          <th>Balance</th>
                          <th>Email</th>
                          <th>Birthday</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <User
                        users={this.state.users}
                        onDelete={this.onDeleteHandler}
                      />
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
