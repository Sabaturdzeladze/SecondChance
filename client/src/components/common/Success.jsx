import React from "react";
import success from "./success.png";

const Success = ({style}) => {
  return (
      <img
        src={success}
        alt="Successfully Done"
        {...style}
      />
  );
};

Success.defaultProps = {
  style: {
    width: "50px",
    margin: "0 0 0 150px",
    display: "inline-block",
  }
};

export default Success;
