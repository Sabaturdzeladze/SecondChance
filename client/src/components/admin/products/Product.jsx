import React from "react";
import { Link } from "react-router-dom";

export const Product = props => {
  return props.products.map(item => (
    <div key={item.id} className="checkout--products-container">
      <div className="checkout--products-container_img">
        <img
          src="http://bestjquery.com/tutorial/product-grid/demo9/images/img-2.jpg"
          alt="sneakers"
        />
      </div>
      <div className="checkout--products-container_description">
        <p className="headline">
          <b>
            {item.gender}'s {item.subCategory}
          </b>
        </p>
        <p className="headline">Brand: {item.brand}</p>
        <p className="headline">Condition: {item.condition}</p>
        <p className="headline">Color: {item.color}</p>
        <p className="headline">Size: {item.size}</p>
      </div>
      <div className="checkout--products-container_delete">
        <b>
          Price:{" "}
          <span className={item.priceSale ? "reduced" : "price"}>
            {item.price}$
          </span>{" "}
          {item.priceSale && <span className="price">{item.priceSale}$</span>}
        </b>
        <button
          onClick={e =>
            props.onDelete(e, props.value.user.id, item.id, props.value)
          }
          className="btn btn-danger"
        >
          <i className="fas fa-trash-alt" />
        </button>
        <Link to={`/admin/product/edit/${item.id}`} className="btn"
        >
          <i className="far fa-edit" />
        </Link>
      </div>
    </div>
  ));
};
