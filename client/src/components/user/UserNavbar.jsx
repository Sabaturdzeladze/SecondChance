import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class AdminNavigation extends Component {
  render() {
    return (
      <div id="cssmenu">
        <ul>
          <li>
            <NavLink to="/dashboard" exact>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">
              <span>Cart</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/wishlist">
              <span>Wishlist</span>
            </NavLink>
          </li>
          <li className="last">
            <NavLink to="/dashboard/history">
              <span>Order History</span>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default AdminNavigation;
