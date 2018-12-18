import React, { Component } from "react";
import axios from "axios";

export default class NewProduct extends Component {
  constructor() {
    super()
    this.state = {
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
      images: [],
      selectedFile: ''
    };
  }

  onChangeHandler = e => {
    switch (e.target.name) {
      case 'selectedFile':
        this.setState({ selectedFile: e.target.files[0] })
        break
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const { gender, brand, category, subCategory, size, color, price, priceSale, desc, condition, selectedFile } = this.state;
    let formData = new FormData();
    formData.append('gender', gender);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('brand', brand);
    formData.append('size', size);
    formData.append('color', color);
    formData.append('price', price);
    formData.append('priceSale', priceSale);
    formData.append('desc', desc);
    formData.append('condition', condition);
    formData.append('selectedFile', selectedFile);

    axios
      .post("/api/products/addnew", formData)
      .then(res => {

        console.log(formData)
      })
      .catch(err => console.log(err));
  }

  render() {
    const { brand, selectedFile } = this.state
    return (
      <>
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>New Product Form</h2>

        <form className="form-product" onSubmit={this.onSubmitHandler}>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="formGroupExampleInput3">Gender</label>
              <select
                // required
                name="gender"
                id="formGroupExampleInput3"
                className="custom-select custom-select-m"
                onChange={this.onChangeHandler}
              >
                <option defaultValue />
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="formGroupExampleInput4">Category</label>
              <select
                // required
                name="category"
                id="formGroupExampleInput4"
                className="custom-select custom-select-m"
                onChange={this.onChangeHandler}
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
                // required
                name="subCategory"
                id="formGroupExampleInput5"
                className="custom-select custom-select-m"
                onChange={this.onChangeHandler}
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
                // required
                type="text"
                className="form-control"
                id="formGroupExampleInput6"
                name="brand"
                placeholder="adidas / nike"
                value={brand}
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="formGroupExampleInput7">Size</label>
              <input
                // required
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
                // required
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
                // required
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
                // required
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
                // required
                name="condition"
                id="formGroupExampleInput11"
                className="custom-select custom-select-m"
                onChange={this.onChangeHandler}
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
                // required
                type="text"
                className="form-control"
                id="formGroupExampleInput12"
                name="desc"
                placeholder="Product Description"
                onChange={this.onChangeHandler}
              />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="customFile">Product Images</label>

            <div className="custom-file col-md-12">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                name="selectedFile"
                onChange={this.onChangeHandler}
              />
              <label className="custom-file-label" htmlFor="customFile">
                Choose 4 photos
              </label>
            </div>
          </div>
        
          <div class="col-md-12 text-center"> 
          <button
          type="submit"
          className="btn btn-primary new-product-button"
        >
          Add
        </button>
          </div>
        </form>
      </>
    );
  }
}
