import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { Consumer } from "../../../../context-api/Context";
import { CartItem } from "../../../cart/CartItem";
import Spinner from "../../../common/Spinner";

export default class Wishlist extends Component {
  state = {
    total: 0,
    grandTotal: 0,
    loading: false
  };

  onDelete = (e, user_id, product_id, value) => {
    this.setState(() => ({ loading: true }));
    axios
      .delete(`/api/users/${user_id}/wishlist/${product_id}`)
      .then(res => {
        let user = value.user;
        user.wishlist = res.data;
        localStorage.setItem("user", JSON.stringify(user));
        value.onStateChange({ user });
        this.setState(() => ({ loading: false }));
      })
      .catch(err => console.log(err));
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
          ) : user.wishlist.length ? (
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
                  <CartItem
                    value={value}
                    onDelete={this.onDelete}
                    cart={value.user.wishlist}
                  />
                </div>
              </div>
            </main>
          ) : (
            <div style={{ textAlign: "center", padding: "30px" }}>
              <h2 style={{ padding: "50px" }}>No items in Wishlist</h2>
              <Link to="/">Continue Shopping</Link>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
