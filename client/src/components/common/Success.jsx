import React from "react";
import success from "./success.png";

const Success = ({style}) => {
  return (
      <img
        src={success}
        alt="Successfully Done"
        style={{...style}}
      />
  );
};

Success.defaultProps = {
  style: {
    width: "50px",
    display: "inline-block"
  }
};

export default Success;
