import React from "react";
import { Link } from 'react-router-dom';

export const CategoryProducts = props => {
  return (
    <section className="main-products">
      <ul className="main-products__list">
        <div className="main-products__list--item">
          <Link to="/products/search?gender=men">Shop Men's</Link>
        </div>
        <div className="main-products__list--item">
          <Link to="/products/search?category=bags">Shop Bags</Link>
        </div>
        <div className="main-products__list--item">
          <Link to="/products/search?gender=women&category=shoes">Women's Shoes</Link>
        </div>
        <div className="main-products__list--item">
          <Link to="/products/search?gender=women&category=clothing">Women's Clothing</Link>
        </div>
        <div className="main-products__list--item">
          <Link to="/products/search?category=accessories">Accessories</Link>
        </div>
        <div className="main-products__list--item">
          <Link to="/products/search?gender=women">Shop Women's</Link>
        </div>
        <div className="main-products__list--item">
          <Link to="/products/search?gender=men&category=shoes">Men's Shoes</Link>
        </div>
        <div className="main-products__list--item">
          <Link to="/products/search?gender=men&category=clothing">Men's Clothing</Link>
        </div>
        <div className="main-products__list--item">
          <Link to="/deals">Sale</Link>
        </div>
      </ul>
    </section>
  );
};
