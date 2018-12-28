// importing files and libraries
import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Consumer } from "../../context-api/Context";
import { CartItem } from "./CartItem";
import axios from "axios";
import Spinner from "../common/Spinner";


export default class Cart extends Component {
  // total/grandtotal for balance coverage, loading for spinner animation
  state = {
    total: 0,
    grandTotal: 0,
    loading: false
  };

  // axios delete method 
  onDelete = (e, user_id, product_id, value) => {
    this.setState(() => ({ loading: true }));
    axios
      .delete(`/api/users/${user_id}/cart/${product_id}`) // delete method on provided url 
      .then(res => {
        let user = value.user; // taking user from context-api
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
                  <div className="checkout--products-product">
                    <b>Product</b>
                  </div>
                  <div className="checkout--products-description">
                    <b>Description</b>
                  </div>
                  <div className="checkout--products-price">
                    <b>Price</b>
                  </div>
                </div>

                <div className="cart-item__container">
                  <CartItem
                    value={value}
                    onDelete={this.onDelete}
                    cart={value.user.cart}
                  />
                </div>

                <div>
                  <table className="cart-total__table">
                    <tbody>
                      <tr>

                        <td>
                          <h5>Subtotal<br />Estimated shipping <br /> {this.totalCalculator(value.user.cart) >= 25
                            ? ""
                            : (
                              <p><small style={{ color: "red" }}>Add {25 - this.totalCalculator(value.user.cart)}$ worth items and get</small></p>
                            )}</h5><h3>Total</h3></td>
                        <td className="text-right"><h5><strong>{this.totalCalculator(value.user.cart).toFixed(2)}$<br />{this.totalCalculator(value.user.cart) >= 25
                          ? "0.00$"
                          : (<p>4.99$<br /> <small style={{ color: "red" }}>free shipping</small></p>)
                        } </strong></h5><h3>{this.grandTotal(
                          this.totalCalculator(value.user.cart)
                        ).toFixed(2)}
                            $</h3></td>
                      </tr>

                      <tr>
                        <td>
                          <Link to="/" className="continue-shopping-button">
                            <i className="fas fa-shopping-cart"></i> Continue Shopping
                        </Link>
                        </td>
                        <td>
                          <Link to="/dashboard/checkout" className="checkout-button">
                            Checkout{" "}
                            <i className="fas fa-arrow-circle-right" />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>

                <hr />


              </div>
            </main>
          ) : (
                  <div style={{ textAlign: 'center', padding: '30px' }}>
                    <h2 style={{ padding: '50px' }}>No items in Cart</h2>
                    <Link to="/">Go Back To Shopping</Link>
                  </div>
                );
        }}
      </Consumer>
    );
  }
}
