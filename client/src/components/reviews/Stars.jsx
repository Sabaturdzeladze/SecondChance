import React from "react";

export default ({ stars }) => {
  return (
    <>
      {stars.map((item, index) => (
        <i
          key={index}
          className="fas fa-star"
        />
      ))}
    </>
  );
};
