import React from "react";
import { Link } from "react-router-dom";

const ProductNotFound = () => {
  return (
    <div className="not-found">
      <h2>Product Not Found</h2>
      <img src="/images/404-item-not-found.jpg" alt="" />
      <div className="not-found__wrapper">
        <Link className="not-found__btn" to="/">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ProductNotFound;
