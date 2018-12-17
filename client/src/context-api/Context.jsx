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
    axios
      .get("/api/products/search/all")
      .then(res => {
        const saled = res.data.filter(item => item.priceSale > 0).slice(0, 4);
        // console.log(res.data.filer(item => item.priceSale > 0))
        this.setState({ newest: res.data.slice(0, 4), saleItems: saled });
      })
      .catch(err => console.log(err));
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.setState({ user, isLogged: true });
    }
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
