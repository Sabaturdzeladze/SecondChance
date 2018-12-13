import React, { Component } from "react";

const Context = React.createContext();

export default class Provider extends Component {
  state = {
    user: {},
    errors: {},
    products: {},
    isLogged: true
  };

  onChangeHandler = (change) => {
    this.setState(change);
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
