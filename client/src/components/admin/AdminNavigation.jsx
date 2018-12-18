import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class AdminNavigation extends Component {
    render() {
        return (

            <nav className="navbar navbar-expand-md navbar-light bg-light admin-dashboard">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-item nav-link" to="/admin/products">Show Products<span className="sr-only">(current)</span></NavLink>
                        <NavLink className="nav-item nav-link" to="/admin/product/add">New Product</NavLink>
                        <NavLink className="nav-item nav-link" to="/admin/users">Users</NavLink>
                        <NavLink className="nav-item nav-link" to="/admin/messenger">Messenger</NavLink>
                    </div>
                </div>
            </nav>

        );
    }
}

export default AdminNavigation;