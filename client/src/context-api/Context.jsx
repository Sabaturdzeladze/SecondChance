import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

export default class Provider extends Component {
  state = {
    user: {},
    errors: {},
    products: {},
    isLogged: false
  };

  onChangeHandler = change => {
    this.setState(change);
  };

  componentDidMount() {
    axios
      .get("/api/products/search/all")
      .then(res => this.setState({ products: res.data }));
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.setState({ user, isLogged: true });
    }
  }

  render() {
    const { user, errors, products, isLogged } = this.state;
    return (
      <Context.Provider
        value={{
          user,
          errors,
          products,
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
