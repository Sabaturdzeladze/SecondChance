import React from "react";

export default ({ stars }) => {
  return (
    <>
      {stars.map((item, index) => (
        <i
          key={index}
          className="fas fa-star"
          style={{ fontSize: "30px", color: "#d6880e" }}
        />
      ))}
    </>
  );
};
