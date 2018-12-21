import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context-api/Context";
import ProductImages from "./ProductImages";

export default class ProductDetails extends Component {
  state = {
    gender: "",
    images: [],
    url1: "",
    url2: "",
    category: "",
    subCategory: "",
    brand: "",
    size: "",
    color: "",
    price: 0,
    priceSale: 0,
    desc: "",
    condition: ""
  };

  onSubmitHandler = (e, user_id, callback) => {
    e.preventDefault();

    if (!user_id) {
      window.location = "/login";
    } else {
      this.setState(() => ({ loading: true }));

      setTimeout(() => {
        const id = this.props.match.params.id;
        axios
          .post(`/api/users/${user_id}/cart/${id}`, {})
          .then(res => {
            let user = JSON.parse(localStorage.getItem("user"));
            user.cart = res.data.cart;
            localStorage.setItem("user", JSON.stringify(user));
            callback({ user });
            this.setState({ added: true, loading: false });
          })
          .catch(err => {
            console.log(err.response.data.msg);
            this.setState({ loading: false });
          });
      }, 500);
    }
  };

  onWishlistAdd = (e, user_id, callback) => {
    e.preventDefault();

    if (!user_id) {
      window.location = "/login";
    } else {
      this.setState(() => ({ loading: true }));

      setTimeout(() => {
        const id = this.props.match.params.id;
        axios
          .post(`/api/users/${user_id}/wishlist/${id}`, {})
          .then(res => {
            let user = JSON.parse(localStorage.getItem("user"));
            user.wishlist = res.data;
            localStorage.setItem("user", JSON.stringify(user));
            callback({ user });
            this.setState({ added: true, loading: false });
          })
          .catch(err => {
            console.log(err.response.data.msg);
            this.setState({ loading: false });
          });
      }, 500);
    }
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`/api/products/${id}`).then(res => {
      this.setState({ ...res.data });
    });
  }

  render() {
    return (
      <Consumer>
        {value => {
          return (
            <div className="container">
              <div className="card">
                <div className="container-fliud">
                  <div className="wrapper row">
                    <ProductImages main={this.state.images} url1={this.state.url1} url2={this.state.url2}/>
                    <div className="details col-md-6">
                      <h3 className="product-title">
                        {this.state.gender}'s {this.state.subCategory}{" "}
                      </h3>
                      <p>
                        <strong>Brand: {this.state.brand}</strong>
                      </p>
                      <p className="product-description">{this.state.desc}</p>
                      <h5 className="price">
                        Price:{" "}
                        {this.state.priceSale && (
                          <span style={{ color: "black" }} className="price">
                            {this.state.priceSale}$
                          </span>
                        )}{" "}
                        <span
                          className={this.state.priceSale ? "reduced" : "price"}
                        >
                          {this.state.price}$
                        </span>
                      </h5>
                      <h5 className="sizes">
                        condition:{" "}
                        <span
                          className="size"
                          data-toggle="tooltip"
                          title="small"
                          style={{ marginLeft: "0px" }}
                        >
                          {this.state.condition}
                        </span>
                      </h5>
                      <h5 className="sizes">
                        size:{" "}
                        <span
                          className="size"
                          data-toggle="tooltip"
                          title="small"
                          style={{ marginLeft: "0px" }}
                        >
                          {this.state.size}
                        </span>
                      </h5>
                      <h5 className="colors">color: {this.state.color}</h5>
                      <div className="action">
                        <button
                          className="product-details__button btn btn-default"
                          type="button"
                          onClick={e =>
                            this.onSubmitHandler(
                              e,
                              value.user.id,
                              value.onStateChange
                            )
                          }
                        >
                          Add To Cart
                        </button>
                        <button
                          className="product-details__button btn btn-default"
                          type="button"
                          onClick={e =>
                            this.onWishlistAdd(
                              e,
                              value.user.id,
                              value.onStateChange
                            )
                          }
                        >
                          Add To Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
