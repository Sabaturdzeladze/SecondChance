import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../common/Spinner";
import { Consumer } from "../../../context-api/Context";
import { Product } from "./Product";
 
export default class ShowProducts extends Component {
  state = {
    loading: false
  };
  render() {
    return (
      <Consumer>
        {value => {
          return this.state.loading ? (
            <Spinner />
          ) : value.newest.length ? (
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
                  <Product
                    value={value}
                    onDelete={this.onDelete}
                    products={value.newest}
                  />
                </div>
              </div>
            </main>
          ) : (
            <div style={{ textAlign: "center", padding: "30px" }}>
              <h2 style={{ padding: "50px" }}>No items in Cart</h2>
              <Link to="/">Go Home</Link>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
