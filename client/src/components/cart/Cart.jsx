import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Consumer } from "../../context-api/Context";
import { CartItem } from "./CartItem";
import axios from "axios";
import Spinner from "../common/Spinner";

export default class Cart extends Component {
  state = {
    total: 0,
    grandTotal: 0,
    loading: false
  };

  onDelete = (e, user_id, product_id, value) => {
    this.setState(() => ({ loading: true }));
    axios
      .delete(`/api/users/${user_id}/cart/${product_id}`)
      .then(res => {
        let user = value.user;
        user.cart = res.data;
        localStorage.setItem("user", JSON.stringify(user));
        value.onStateChange({ user });
        this.setState(() => ({ loading: false }));
      })
      .catch(err => console.log(err));
  };

  totalCalculator = cart => {
    let total = 0;
    cart.forEach(item => {
      let increment = item.priceSale ? item.priceSale : item.price;
      total += parseInt(increment);
    });
    return total;
  };

  grandTotal = total => {
    return total >= 25 ? total : total + 4.99;
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
          ) : user.cart.length ? (
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
                    cart={value.user.cart}
                  />
                </div>
                <div className="cart-price">
                  <p>
                  
                    <b>Total Price:</b> {this.totalCalculator(value.user.cart).toFixed(2)}$
                  </p>
                  <p>

                    <b>Shipping:</b>{" "}

                    {this.totalCalculator(value.user.cart) >= 25
                      ? "0.00$"
                      : (
                        <>
                        4.99$ <br/> <small style={{color: "red"}}>Add {25 - this.totalCalculator(value.user.cart)}$ worth items and get free shipping</small>
                        </>
                      ) } 
                 
                  </p>

                  <p>
                    <b>Grand Total:</b>{" "}
                    {this.grandTotal(
                      this.totalCalculator(value.user.cart)
                    ).toFixed(2)}
                    $
                  </p>
                </div>
                <div className="checkout--buttons">
                  <Link to="/">
                    <i className="fas fa-arrow-circle-left" /> Continue Shopping
                  </Link>
                  <Link to="/dashboard/checkout">
                    PROCEED TO CHECKOUT{" "}
                    <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
            </main>
          ) : (
            <div style={{textAlign: 'center', padding: '30px'}}>
              <h2 style={{padding: '50px'}}>No items in Cart</h2>
              <Link to="/">Go Back To Shopping</Link>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
