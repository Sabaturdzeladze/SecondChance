import React, { Component } from "react";
import axios from "axios";

export default class NewProduct extends Component {
  state = {
    gender: "",
    category: "",
    subCategory: "",
    brand: "",
    size: "",
    color: "",
    price: 0,
    priceSale: 0,
    desc: "",
    condition: "",
    images: []
  };
  onSubmitHandler = e => {
    e.preventDefault();

    const { product } = this.state;

    axios
      .post("/api/admin/products/addnew", product)
      .then(res => {
        this.setState({
          gender: "",
          category: "",
          subCategory: "",
          brand: "",
          size: "",
          color: "",
          price: 0,
          priceSale: 0,
          desc: "",
          condition: "",
          images: []
        });
      })
      .catch(err => console.log(err));
  };
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onFileUpload = e => {
    console.log(Array.from(e.target.files));
    // this.setState(() => ({ images: e.target.files }))
    // console.log(this.state.images);
  }
  render() {
    return (
      <>
        <h2 style={{ textAlign: "center" }}>New Product Form</h2>

        <form onSubmit={this.onSubmitHandler}>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="formGroupExampleInput3">Gender</label>
              <select
                required
                name="gender"
                id="formGroupExampleInput3"
                className="custom-select custom-select-m"
              >
                <option defaultValue />
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="formGroupExampleInput4">Category</label>
              <select
                required
                name="category"
                id="formGroupExampleInput4"
                className="custom-select custom-select-m"
              >
                <option defaultValue />
                <option value="clothing">Clothing</option>
                <option value="shoes">Shoes</option>
                <option value="bags">Bags</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="formGroupExampleInput5">Sub-Category</label>
              <select
                required
                name="subcategory"
                id="formGroupExampleInput5"
                className="custom-select custom-select-m"
              >
                <option defaultValue />
                <optgroup label="Clothing">
                  <option value="jeans">Jeans</option>
                  <option value="pants">Pants</option>
                  <option value="joggers">Joggers</option>
                  <option value="shorts">Shorts</option>
                  <option value="skirts/dress">Skirts / Dress</option>
                  <option value="shirts">Shirts</option>
                  <option value="t-shirts/tops">T-shirts / Tops</option>
                  <option value="polos">Polos</option>
                  <option value="sweaters">Sweaters</option>
                  <option value="hoodies">Hoodies</option>
                  <option value="outerwear/blazers/coats">
                    Outerwear / Blazers / Coats
                  </option>
                  <option value="winter-jacket">Winter Jackets</option>
                  <option value="winter-pants">Winter Pants</option>
                </optgroup>

                <optgroup label="Shoes">
                  <option value="sneakers/athletics">
                    Sneakers / Athletics
                  </option>
                  <option value="boots">Boots</option>
                  <option value="sandals">Sandals</option>
                  <option value="loafers">Loafers</option>
                  <option value="oxfords">Oxfords</option>
                  <option value="heels">Heels</option>
                  <option value="skiing-boots">Skiing Boots</option>
                  <option value="snowboarding-boots">Snowboarding Boots</option>
                </optgroup>

                <optgroup label="Accessories">
                  <option value="sunglasses">Sunglasses</option>
                  <option value="hats">Hats</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="watches">Watches</option>
                  <option value="belts">Belts</option>
                  <option value="wallets">Wallets</option>
                  <option value="wallets">Helmets</option>
                </optgroup>

                <optgroup label="Bags">
                  <option value="handbags">Handbags</option>
                  <option value="backpacks">Backpacks</option>
                  <option value="luggage">Luggage</option>
                </optgroup>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="formGroupExampleInput6">Brand</label>
              <input
                required
                type="text"
                className="form-control"
                id="formGroupExampleInput6"
                name="brand"
                placeholder="adidas / nike"
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="formGroupExampleInput7">Size</label>
              <input
                required
                type="text"
                className="form-control"
                id="formGroupExampleInput7"
                name="size"
                placeholder="s / m / 37 / 43"
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="formGroupExampleInput8">Color</label>
              <input
                required
                type="text"
                className="form-control"
                id="formGroupExampleInput8"
                name="color"
                placeholder="red / black / multi-color"
                onChange={this.onChangeHandler}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="formGroupExampleInput9">Price</label>
              <input
                required
                type="text"
                className="form-control"
                id="formGroupExampleInput9"
                name="price"
                placeholder="Price"
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="formGroupExampleInput10">Price Sale</label>
              <input
                required
                type="text"
                className="form-control"
                id="formGroupExampleInput10"
                name="priceSale"
                placeholder="Price Sale"
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="formGroupExampleInput11">Condition</label>
              <select
                required
                name="condition"
                id="formGroupExampleInput11"
                className="custom-select custom-select-m"
              >
                <option defaultValue />
                <option value="bad">Bad</option>
                <option value="normal">Normal</option>
                <option value="good">Good</option>
                <option value="like-new">Like-new</option>
              </select>{" "}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="formGroupExampleInput12">Description</label>
              <input
                required
                type="text"
                className="form-control"
                id="formGroupExampleInput12"
                name="password"
                placeholder="Product Description"
                onChange={this.onChangeHandler}
              />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="customFile">Product Images</label>

            <div className="custom-file col-md-12">
              <input
                required
                type="file"
                className="custom-file-input"
                id="customFile"
                name="images"
                onChange={this.onFileUpload}
              />
              <label className="custom-file-label" htmlFor="customFile">
                Choose 4 photos
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </>
    );
  }
}
