import React from "react";
import { Consumer } from "../../context-api/Context";
import FilteredItem from "../searching/FilteredItem";

export const Newest = () => (
  <Consumer>
    {value => {
      const { newest } = value;

      return (
        <>
          <h2 style={{textAlign: 'center', paddingTop: '20px'}}>Newest Products</h2>
          <div className="row productsDisplay">
            {newest.slice(0, 12).map((item, index) => (
              <FilteredItem {...item} key={index} />
            ))}
          </div>
        </>
      );
    }}
  </Consumer>
);
