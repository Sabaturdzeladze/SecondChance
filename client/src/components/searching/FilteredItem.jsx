import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Consumer } from "../../context-api/Context";

class FilteredItem extends Component {
  onSubmitHandler = (e, user_id, id, callback) => {
    e.preventDefault();

    if (!user_id) {
      window.location = '/login';
    } else {
      axios
        .post(`/api/users/${user_id}/cart/${id}`, {})
        .then(res => {
          let user = JSON.parse(localStorage.getItem("user"));
          user.cart = res.data;
          localStorage.setItem("user", JSON.stringify(user));
          callback({ user });
          console.log(user.cart);
        })
        .catch(err => console.log(err.response.data.msg));
    }
    
  };
  render() {
    return (
      <Consumer>
        {value => (
          <div className="col-md-3 col-sm-6">
            <div className="product-grid">
              <div className="product-image">
                <Link to={`/products/item/${this.props.id}`}>
                  <img
                    alt="Product"
                    className="pic-1"
                    src="http://bestjquery.com/tutorial/product-grid/demo9/images/img-1.jpg"
                  />
                  <img
                    alt="Product"
                    className="pic-2"
                    src="http://bestjquery.com/tutorial/product-grid/demo9/images/img-2.jpg"
                  />
                </Link>
                <ul className="social">
                  <li>
                    <button
                      className="add-to-cart wishlist"
                      data-tip="Add to Wishlist"
                    >
                      <i className="fa fa-shopping-bag" />
                    </button>
                  </li>
                  <li>
                    <button
                      className="add-to-cart"
                      onClick={e =>
                        this.onSubmitHandler(
                          e,
                          value.user.id,
                          this.props.id,
                          value.onStateChange
                        )
                      }
                      data-tip="Add to Cart"
                    >
                      <i className="fa fa-shopping-cart" />
                    </button>
                  </li>
                </ul>
              </div>
              <div className="product-content">
                <h3 className="title">
                  <Link to={`/products/item/${this.props.id}`}>
                    {this.props.gender
                      ? `${this.props.gender}'s ${this.props.subCategory}`
                      : `${this.props.subCategory}`}
                  </Link>
                </h3>
                <div className="price">{this.props.price}$</div>
                <button
                  onClick={e =>
                    this.onSubmitHandler(
                      e,
                      value.user.id,
                      this.props.id,
                      value.onStateChange
                    )
                  }
                  className="add-to-cart"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </Consumer>
    );
  }
}

export default FilteredItem;
