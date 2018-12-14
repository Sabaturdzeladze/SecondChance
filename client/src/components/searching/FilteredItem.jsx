import React from "react";
import { Link } from 'react-router-dom';

export const FilteredItem = props => {
  return (
    
    <div className="col-md-3 col-sm-6">
      <div className="product-grid">
        <div className="product-image">
          <a href="#">
            <img
              className="pic-1"
              src="http://bestjquery.com/tutorial/product-grid/demo9/images/img-1.jpg"
            />
            <img
              className="pic-2"
              src="http://bestjquery.com/tutorial/product-grid/demo9/images/img-2.jpg"
            />
          </a>
          <ul className="social">
            <li>
              <a href="" data-tip="Add to Wishlist">
                <i className="fa fa-shopping-bag" />
              </a>
            </li>
            <li>
              <a href="" data-tip="Add to Cart">
                <i className="fa fa-shopping-cart" />
              </a>
            </li>
          </ul>
        </div>

        <div className="product-content">
          <h3 className="title">
            <Link to={`/products/item/${props.id}`}>{props.gender ? `${props.gender}'s ${props.subCategory}` : `${props.subCategory}` }</Link>
          </h3>
          <div className="price">{props.price}$</div>
          <a className="add-to-cart" href="">
            Add To Cart
          </a>
        </div>
      </div>
    </div>
  );
};
