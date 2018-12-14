import React from 'react'

export const FilteredItem = (props) => {
  return (
    <div style={{border: '1px solid #333'}}>
      <h3>Gender: {props.gender}</h3>
      <h3>category: {props.category}</h3>
      <h3>Sub Category: {props.subCategory}</h3>
    </div>
  )
}
