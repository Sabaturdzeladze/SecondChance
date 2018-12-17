import React, { Component } from "react";
import axios from "axios";

export default class ProductDetails extends Component {
  state = {
    gender: "",
    images: [],
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

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`/api/products/${id}`).then(res => {
      this.setState({ ...res.data });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="container-fliud">
            <div className="wrapper row">
              <div className="preview col-md-6">
                <div className="preview-pic tab-content">
                  <div className="tab-pane active" id="pic-1">
                    <img alt="Product Details" src="http://placekitten.com/400/252" />
                  </div>
                  <div className="tab-pane" id="pic-2">
                    <img alt="Product Details" src="http://placekitten.com/400/252" />
                  </div>
                  <div className="tab-pane" id="pic-3">
                    <img alt="Product Details" src="http://placekitten.com/400/252" />
                  </div>
                  <div className="tab-pane" id="pic-4">
                    <img alt="Product Details" src="http://placekitten.com/400/252" />
                  </div>
                  <div className="tab-pane" id="pic-5">
                    <img alt="Product Details" src="http://placekitten.com/400/252" />
                  </div>
                </div>
                <ul className="preview-thumbnail nav nav-tabs">
                  <li className="active">
                    <a href="/" data-target="#pic-1" data-toggle="tab">
                      <img alt="Product Details" src="http://placekitten.com/200/126" />
                    </a>
                  </li>
                  <li>
                    <a href="/" data-target="#pic-2" data-toggle="tab">
                      <img alt="Product Details" src="http://placekitten.com/200/126" />
                    </a>
                  </li>
                  <li>
                    <a href="/" data-target="#pic-3" data-toggle="tab">
                      <img alt="Product Details" src="http://placekitten.com/200/126" />
                    </a>
                  </li>
                  <li>
                    <a href="/" data-target="#pic-4" data-toggle="tab">
                      <img alt="Product Details" src="http://placekitten.com/200/126" />
                    </a>
                  </li>
                  <li>
                    <a href="/" data-target="#pic-5" data-toggle="tab">
                      <img alt="Product Details" src="http://placekitten.com/200/126" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="details col-md-6">
                <h3 className="product-title">{this.state.gender}'s {this.state.subCategory} </h3>
                <p><strong>Brand: {this.state.brand}</strong></p>
                <p className="product-description">
                 {this.state.desc}
                </p>
                <h4 className="price">
                  Price: <span>${this.state.price}</span>
                </h4>
                <h5 className="sizes">
                  sizes:
                  <span className="size" data-toggle="tooltip" title="small">
                    {this.state.size}
                  </span>
                </h5>
                <h5 className="colors">
                  color: {this.state.color}
                </h5>
                <div className="action">
                  <button className="add-to-cart btn btn-default" type="button">
                    add to cart
                  </button>
                  <button className="like btn btn-default" type="button">
                    <span className="fa fa-heart" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
