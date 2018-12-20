import React, { Component } from "react";
import axios from "axios";
import { Users } from "./Users";
import { Messages } from "./Messages";
import { Consumer } from "../../../context-api/Context";

export default class Messanger extends Component {
  state = {
    users: [],
    currentUser: {},
    text: ""
  };
  componentDidMount() {
    axios
      .get("/api/users/contact/all")
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
  }
  userChange = currentUser => {
    axios
      .put(`/api/users/${currentUser.id}/conversation`, { user: "admin" })
      .then(res => {
        currentUser.conversation = res.data;
        this.setState({ currentUser });
      })
      .catch(err => console.log(err));
    // this.setState({ currentUser });
  };
  onSubmitHandler = (e, value) => {
    e.preventDefault();
    axios
      .post(`/api/users/contact/${this.state.currentUser.id}/message`, {
        message: this.state.text,
        username: value.user.username,
        seenBy: { user: false }
      })
      .then(res => {
        this.state.currentUser.conversation.push(res.data);
        const currentUser = this.state.currentUser;
        this.setState({ currentUser, text: "" });
      })
      .catch(err => console.log(err));
  };
  onChangeHandler = e => {
    this.setState({
      text: e.target.value
    });
  };
  render() {
    const { users, currentUser, text } = this.state;
    return (
      <Consumer>
        {value => (
          <div className="admin-main__wrapper">
            <section className="admin-main__users">
              <ul className="admin-main__users--list">
                <Users userChange={this.userChange} users={users} />
              </ul>
            </section>
            <section className="admin-main__messages">
              <div className="admin-main__messages--wrapper">
                <Messages user={currentUser} />
                {currentUser.username && (
                  <form
                    className="admin-main__messages--form"
                    onSubmit={e => this.onSubmitHandler(e, value)}
                  >
                    <textarea
                      onChange={this.onChangeHandler}
                      value={text}
                      required
                      name="message"
                      id="message"
                      cols="30"
                      rows="3"
                      placeholder="Message"
                    />
                    <button>Submit</button>
                  </form>
                )}
              </div>
            </section>
          </div>
        )}
      </Consumer>
    );
  }
}
