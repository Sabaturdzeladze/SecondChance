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
            <div className="product-details__container">
              <div className="card">
                <div className="container-fliud">
                  <div className="wrapper row">
                    <ProductImages main={this.state.images} url1={this.state.url1} url2={this.state.url2} />
                    <div className="details col-md-6">
                      <h2 className="product-informaton"><span>Product Information</span></h2>

                      <h3>
                        <strong><span className="product-title">{this.state.gender}</span>'s {this.state.subCategory}</strong>{" "}
                      </h3>
                      <h5 className="brand">
                        <strong>Brand:</strong> {this.state.brand}
                      </h5>

                      <h5 className="sizes">
                        <strong>size:</strong>{" "}
                        <span
                          className="size"
                          data-toggle="tooltip"
                          title="small"
                          style={{ marginLeft: "0px" }}
                        >
                          {this.state.size}
                        </span>
                      </h5>

                      <h5 className="colors">
                        <strong>color:</strong> {this.state.color}
                      </h5>

                      <h5 className="condition">
                        <strong>condition:</strong>{" "}
                        <span
                          className="size"
                          data-toggle="tooltip"
                          title="small"
                          style={{ marginLeft: "0px" }}
                        >
                          {this.state.condition}
                        </span>
                      </h5>

                      <h3 className="product-description"><span>Product Description</span></h3>
                      <p className="product-description">{this.state.desc}</p>

                      <h5 className="price-header">

                        <span
                          className={this.state.priceSale ? "reduced" : "price"}
                        >
                          {this.state.price}$
                          </span> <br />
                        {this.state.priceSale && (
                          <span style={{ color: "black" }} className="price">
                            {this.state.priceSale}$
                            </span>
                        )}
                      </h5>

                      <div className="action">
                        <button
                          className="product-details__button product-details__button--cart btn btn-default"
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
                          className="product-details__button product-details__button--wishlist btn btn-default"
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
