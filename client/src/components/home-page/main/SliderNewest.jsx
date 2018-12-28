import React from "react";
import FilteredItem from "../../searching/FilteredItem";

export const SliderNewest = props => {
  const { products } = props;
  return products.map( (item, index) => (
    <FilteredItem newest={true} key={index} {...item} />
  ));
};
