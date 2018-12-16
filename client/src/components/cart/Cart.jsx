import React from "react";
import { Link } from "react-router-dom";

export const Cart = () => {
  return (
    <main>
      <div className="checkout">
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
        <div className="checkout--products-container">
          <div className="checkout--products-container_img">
            <img
              src="https://pumaimages.azureedge.net/images/366890/01/sv01/fnd/PNA/h/200/w/100"
              alt="sneakers"
            />
          </div>
          <div className="checkout--products-container_description">
            <p>Condition: Like New</p>
            <p>Gender: Male</p>
            <p>Color: White</p>
            <p>Size: 41 / L -- ETC</p>
          </div>
          <div className="checkout--products-container_delete">
            <b>Price: 50.99$</b>
            <i className="fas fa-trash-alt" />
          </div>
        </div>
        <div className="checkout--buttons">
          <button>
            <i className="fas fa-arrow-circle-left" /> Continue Shopping
          </button>
          <button>
            PROCEED TO CHECKOUT <i className="fas fa-arrow-circle-right" />
          </button>
        </div>
      </div>
    </main>
  );
};
