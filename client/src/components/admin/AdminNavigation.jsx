import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class AdminNavigation extends Component {
  render() {
    return (
      <div id="cssmenu">
        <ul>
          <li>
            <NavLink to="/admin/messenger">
              <span>Messenger</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/products">
              <span>Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/product/add">
              <span>New Product</span>
            </NavLink>
          </li>
          <li className="last">
            <NavLink to="/admin/users">
              <span>Users</span>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default AdminNavigation;
