import React from "react";
import spinner from "./spinner.gif";

const Spinner = ({ width, margin, display }) => {
  return <img src={spinner} alt="Loading" style={{ width, margin, display }} />;
};

Spinner.defaultProps = {
  width: "200px",
  margin: "auto",
  display: "block"
};

export default Spinner;
