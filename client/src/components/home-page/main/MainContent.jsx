import React from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../../../context-api/Context";
import { Slider } from "./Slider";
import { SliderNewest } from "./SliderNewest"
import { CategoryProducts } from "./CategoryProducts";

export const MainContent = () => {
  return (
    <Consumer>
      {value => {
        return (
          <main className="main">
            <section className="main-layer">
              <div className="main-layer__container">
                <h1>Second Chance for Clothes</h1>
                <Link to="/products/search?gender=women">Shop Women's</Link>
                <Link to="/products/search?gender=men">Shop Men's</Link>
              </div>
            </section>
            <section className="row productsDisplay">
              <h2
                style={{
                  width: "100%",
                  textAlign: "center",
                  paddingBottom: "20px"
                }}
              >
                Newest Products
              </h2>
              <SliderNewest products={value.newest.slice(0, 4)} />
            </section>
            <CategoryProducts />
            <section className="row productsDisplay">
              <h2
                style={{
                  width: "100%",
                  textAlign: "center",
                  paddingBottom: "20px"
                }}
              >
                Sales & Deals
              </h2>
              <Slider products={value.saleItems.slice(0, 4)} />
            </section>
          </main>
        );
      }}
    </Consumer>
  );
};
