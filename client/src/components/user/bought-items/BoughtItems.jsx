import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Consumer } from "../../../context-api/Context";
import Spinner from "../../common/Spinner";
import { BoughtItem } from "./BoughtItem";

export default class BoughtItems extends Component {
  state = {
    loading: false
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { user } = value;
          return !user.username ? (
            <Redirect to="/login" />
          ) : this.state.loading ? (
            <Spinner />
          ) : user.boughtItems.length ? (
            <main>
              <div className="checkout">
                <div className="checkout--products">
                  <div className="checkout--products-description">
                    <h6>Product</h6>
                  </div>
                  <div className="checkout--products--description">
                    <h6>Description</h6>
                  </div>
                  <div className="checkout--products-price">
                    <h6>Price</h6>
                  </div>
                </div>
                <div className="cart-item__container">
                <BoughtItem boughtItems={user.boughtItems}/>
                </div>
              </div>
            </main>
          ) : (
            <div style={{ textAlign: "center", padding: "30px" }}>
              <h2 style={{ padding: "50px" }}>You have not purchased any item yet</h2>
              <Link to="/">Continue Shopping</Link>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
