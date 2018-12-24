import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../../context-api/Context";
import { ConversationText } from "./ConversationText";

export default class Conversation extends Component {
  state = {
    button: true,
    messages: [],
    seenByUser: true,
    text: ""
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user ? user.id : false;
    if (id && !user.isAdmin) {
      axios
        .get(`/api/users/${id}/conversation`)
        .then(res => {
          let seenByUser = true;
          res.data.forEach(message => {
            if (message.seenBy.user === false) {
              seenByUser = false;
            }
          });
          this.setState({ messages: res.data, seenByUser });
        })
        .catch(err => console.log(err));
    }
  }

  onClickHandler = (e, logged, id = 0) => {
    if (!id && logged) {
      this.setState({ button: !this.state.button });
    } else {
      if (logged) {
        axios
          .put(`/api/users/${id}/conversation`, { user: "user" })
          .then(res => {
            this.setState({
              messages: res.data,
              seenByUser: true,
              button: !this.state.button
            });
          })
          .catch(err => console.log(err));
      } else {
        this.props.history.push("/login");
      }
    }
  };

  onSubmitHandler = (e, value) => {
    e.preventDefault();
    axios
      .post(`/api/users/contact/${value.user.id}/message`, {
        message: this.state.text,
        username: value.user.username,
        seenBy: { admin: false }
      })
      .then(res => {
        this.setState({
          messages: [...this.state.messages, res.data],
          text: ""
        });
      })
      .catch(err => console.log(err));
  };

  onChangeHandler = e => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const user = value.user;
          const isLogged = user.username ? true : false;
          return (
            <div className="conversation">
              <button
                onClick={e => {
                  this.onClickHandler(e, isLogged, user.id);
                }}
                id="conversationBtn"
                className={
                  this.state.button
                    ? "btn conversation-open"
                    : "conversation-hide"
                }
                disabled={value.user.isAdmin}
              >
                Conversation{" "}
                {!this.state.seenByUser && <span className="seenState" />}
              </button>
              <div
                className={
                  !this.state.button ? "messenger-wrapper" : "conversation-hide"
                }
                id="conversationText"
              >
                <section className="main-contact">
                  <button
                    onClick={e => {
                      this.onClickHandler(e, isLogged);
                    }}
                    className="close-contact"
                  >
                    X
                  </button>
                  <div className="main-contact__conversation">
                    <div className="main-contact__conversation--text">
                      <ConversationText messages={this.state.messages} />
                    </div>
                    <form
                      className="main-contact__form"
                      onSubmit={e => this.onSubmitHandler(e, value)}
                    >
                      <textarea
                        onChange={this.onChangeHandler}
                        name="message"
                        id="message"
                        cols="30"
                        rows="3"
                        value={this.state.text}
                        placeholder="Message"
                      />
                      <button>Submit</button>
                    </form>
                  </div>
                </section>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
