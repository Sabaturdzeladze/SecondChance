import React from "react";

export const WishlistItem = props => {
  return props.wishlist.map(item => (
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
          className="btn btn-success"
          onClick={e =>
            props.addToCart(e, props.value.user.id, item.id, props.value)
          }
        >
          <i className="fas fa-shopping-cart" />
        </button>
        <button
          onClick={e =>
            props.onDelete(e, props.value.user.id, item.id, props.value)
          }
          className="btn btn-danger"
        >
          <i className="fas fa-trash-alt" />
        </button>
      </div>
    </div>
  ));
};
