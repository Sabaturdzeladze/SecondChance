import React, { Component } from "react";
import User from "./User";
import axios from "axios";

export default class ShowUsers extends Component {
  state = {
    users: []
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
        this.setState({ users: res.data });
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
