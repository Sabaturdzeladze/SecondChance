import React, { Component } from "react";
import axios from "axios";
import { UserCartItem } from "./UserCartItem";

export default class UserCart extends Component {
  state = {
    userCart: []
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`/api/users/${id}`)
      .then(res => {
        this.setState({ userCart: res.data.cart });
      })
      .catch(err => console.log(err.response.data));
  }
  onDeleteHandler = product_id => {
    const id = this.props.match.params.id;
    axios
      .delete(`/api/users/${id}/cart/${product_id}`)
      .then(res => this.setState({ userCart: res.data }))
      .catch(err => console.log(err.response.data));
  };
  render() {
    return (
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
            <UserCartItem
              cart={this.state.userCart}
              onDelete={this.onDeleteHandler}
            />
          </div>
        </div>
      </main>
    );
  }
}
