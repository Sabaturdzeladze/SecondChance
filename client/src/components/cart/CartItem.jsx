import React from "react";
import { Link } from "react-router-dom"

export const CartItem = props => {
  return props.cart.map(item => (
    <div key={item.id} className="checkout--products-container">

      <div className="checkout--products-container_img">
        <Link to={`/products/item/${item.id}`}><img
          src="http://bestjquery.com/tutorial/product-grid/demo9/images/img-2.jpg"
          alt="sneakers"
        /></Link>

      </div>

      <div className="checkout--products-container_description">
        <p className="headline capitalize">
          <b>
            {item.gender}'s {item.subCategory}
          </b>
        </p>
        <p className="headline capitalize"><strong>Brand:</strong> {item.brand}</p>
        <p className="headline capitalize"><strong>Condition:</strong> {item.condition}</p>
        <p className="headline capitalize"><strong>Color:</strong> {item.color}</p>
        <p className="headline capitalize"><strong>Size:</strong> {item.size}</p>
      </div>

      <div className="checkout--products-container_delete">
        <b>
          <span className={item.priceSale ? "reduced" : "price"}>
            {item.price}$
          </span> <br />
          {item.priceSale && (
            <span className="price">{item.priceSale}$</span>
          )}
        </b>
        <button
          onClick={e =>
            props.onDelete(e, props.value.user.id, item.id, props.value)
          }
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-trash-alt" /> <span className="remove-caption">Remove</span>
        </button>
      </div>

    </div>
  ));
};
