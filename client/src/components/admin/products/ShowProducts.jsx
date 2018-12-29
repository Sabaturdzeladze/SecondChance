import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../../../context-api/Context";
import { Product } from "./Product";
import axios from "axios";

export default class ShowProducts extends Component {
  state = {
    filter: "",
    products: [],
    filtered: false
  };
  onChangeHandler = (e, products) => {
    let input = e.target.value.toLowerCase().trim();
    if (!input) {
      this.setState({ products, filtered: false });
    } else {
      products = products.filter(prod => {
        if (prod.brand && prod.brand.toLowerCase().includes(input)) return true;
        // To remove (prod.brand)
        else if (prod.category && prod.category.toLowerCase().includes(input))
          //
          return true;
        else if (
          prod.subCategory && //
          prod.subCategory.toLowerCase().includes(input)
        )
          return true;
        else if (
          prod.gender && //
          prod.gender.toLowerCase().includes(input)
        )
          return true;
        return false;
      });
      this.setState(() => ({ products, filtered: true }));
    }
  };

  onDelete = (prod_id, value) => {
    // console.log(value.newest);
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`/api/products/${prod_id}`)
        .then(res => {
          let products = value.newest.filter(prod => {
            // console.log(prod.id !== res.data.id)
            return prod.id !== res.data.id;
          });
          value.onStateChange({ newest: products });
          this.setState({ products });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Consumer>
        {value => {
          let products = value.newest;
          return value.newest.length ? (
            <main>
              <div className="checkout">
                <label style={{ width: "100%" }} htmlFor="filter">
                  <input
                    style={{ width: "100%" }}
                    onChange={e => this.onChangeHandler(e, value.newest)}
                    type="text"
                    name="filter"
                    placeholder="Search for Products"
                  />
                </label>
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
                    products={
                      this.state.products.length > 0 || this.state.filtered
                        ? this.state.products
                        : products
                    }
                  />
                </div>
              </div>
            </main>
          ) : (
            <div style={{ textAlign: "center", padding: "30px" }}>
              <h2 style={{ padding: "50px" }}>No Products Found</h2>
              <Link to="/">Go Home</Link>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
