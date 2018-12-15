import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

export default class Provider extends Component {
  state = {
    user: {},
    errors: {},
    newest: [],
    isLogged: false
  };

  onChangeHandler = change => {
    this.setState(change);
  };

  componentDidMount() {
    axios
      .get("/api/products/search/all")
      .then(res => this.setState({ newest: res.data.slice(0, 4) }));
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.setState({ user, isLogged: true });
    }
  }

  render() {
    const { user, errors, newest, isLogged } = this.state;
    return (
      <Context.Provider
        value={{
          user,
          errors,
          newest,
          isLogged,
          onStateChange: this.onChangeHandler
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
