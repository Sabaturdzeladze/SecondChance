import React from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../../../context-api/Context";
import { Slider } from "./Slider";
import { CategoryProducts } from "./CategoryProducts";

export const MainContent = () => {
  return (
    <Consumer>
      {value => {
        return (
          <main className="main">
            <section className="main-layer">
              <div className="main-layer__container">
                <h1>Second Chance for Products</h1>
                <Link to="/products/search?gender=women">Shop Women's</Link>
                <Link to="/products/search?gender=men">Shop Women's</Link>
              </div>
            </section>
            <section className="row productsDisplay">
                <Slider products={value.newest} />
            </section>
            <CategoryProducts />
            <section className="row productsDisplay">
                <Slider products={value.saleItems} />
            </section>
          </main>
        );
      }}
    </Consumer>
  );
};
