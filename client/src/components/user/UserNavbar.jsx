import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class AdminNavigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light user-dashboard">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" exact to="/dashboard">
              Dashboard<span className="sr-only">(current)</span>
            </NavLink>
            <NavLink className="nav-item nav-link" to="/dashboard/cart">
              My Cart
            </NavLink>
            <NavLink className="nav-item nav-link" to="/dashboard/wishlist">
              My Wishlist
            </NavLink>
            <NavLink className="nav-item nav-link" to="/dashboard/history">
              Order History
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default AdminNavigation;
