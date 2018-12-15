import React from "react";
import { FilteredItem } from "../../searching/FilteredItem";

export const Slider = props => {
  const { products } = props;
  return products.map( (item, index) => (
    <FilteredItem key={index} {...item} />
  ));
};
