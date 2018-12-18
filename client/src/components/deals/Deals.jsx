import React from "react";
import { Consumer } from "../../context-api/Context";
import FilteredItem from "../searching/FilteredItem";

export const Deals = () => (
  <Consumer>
    {value => {
      const { saleItems } = value;

      return (
        <>
          <h2 style={{textAlign: 'center', paddingTop: '20px'}}>Products on Sale</h2>
          <div className="row productsDisplay">
            {saleItems.map((item, index) => (
              <FilteredItem {...item} key={index} />
            ))}
          </div>
        </>
      );
    }}
  </Consumer>
);
