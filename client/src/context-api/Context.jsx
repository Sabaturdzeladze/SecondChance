import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

export default class Provider extends Component {
  state = {
    user: {},
    errors: {},
    newest: [],
    saleItems: [],
    isLogged: false
  };

  onChangeHandler = change => {
    this.setState(change);
  };

  componentDidMount() {
    if (
      !JSON.parse(localStorage.getItem("remember")) &&
      new Date() - JSON.parse(localStorage.getItem("expiration")) >= 0
    ) {
      localStorage.clear();
    }
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user) {
      this.setState({ user, isLogged: true });
    }
    axios
      .get("/api/products/search/all")
      .then(res => {
        const saled = res.data.filter(item => item.priceSale > 0);
        this.setState({ newest: res.data, saleItems: saled });
      })
      .catch(err => console.log(err));
    
  }

  render() {
    const { user, errors, newest, isLogged, saleItems } = this.state;
    return (
      <Context.Provider
        value={{
          user,
          errors,
          newest,
          isLogged,
          onStateChange: this.onChangeHandler,
          saleItems
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
