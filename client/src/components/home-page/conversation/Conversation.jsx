import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../../context-api/Context";
import { ConversationText } from "./ConversationText";

export default class Conversation extends Component {
  state = {
    button: true,
    messages: [],
    text: ""
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user ? user.id : false;
    if (id && !user.isAdmin) {
      axios
        .get(`/api/users/${id}/conversation`)
        .then(res => {
          this.setState({ messages: res.data });
        })
        .catch(err => console.log(err));
    }
  }

  onClickHandler = (e, logged) => {
    if (logged) {
      this.setState({ button: !this.state.button });
    } else {
      this.props.history.push("/login");
    }
  };

  onSubmitHandler = (e, value) => {
    e.preventDefault();
    axios
      .post(`/api/users/contact/${value.user.id}/message`, {
        message: this.state.text,
        username: value.user.username
      })
      .then(res => {
        this.setState({ messages: [...this.state.messages, res.data] });
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
                  this.onClickHandler(e, isLogged);
                }}
                className={
                  this.state.button
                    ? "btn conversation-open"
                    : "conversation-hide"
                }
                disabled={value.user.isAdmin}
              >
                Conversation
              </button>
              <div
                className={
                  !this.state.button ? "messenger-wrapper" : "conversation-hide"
                }
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
