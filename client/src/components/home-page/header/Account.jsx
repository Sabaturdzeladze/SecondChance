import React from "react";
import { Link } from "react-router-dom";

export const Account = props => {
  const {user} = props;
  return !props.value.isLogged ? (
    <>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </>
  ) : (
    <>
      {user.username !== "Admin" && (
        <Link to="/dashboard/cart" className="cart-link">
          <i className="fas fa-shopping-cart" />{" "}
          <span className="cart-length">{user.cart.length}</span>
        </Link>
      )}
      <Link
        to="/"
        onClick={() => {
          props.value.onStateChange({ user: {}, isLogged: false });
          localStorage.clear();
          document.getElementById("conversationText").className =
            "conversation-hide";
          document.getElementById("conversationBtn").className =
            "btn conversation-open";
        }}
      >
        Logout
      </Link>
      <Link to={user.isAdmin ? `/admin` : `/dashboard`}>My Account</Link>
    </>
  );
};
