import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AdminNavigation from "./AdminNavigation"

class Admin extends Component {
    render() {
        return (
            <div>
                <AdminNavigation />
            </div>
        );
    }
}

export default Admin;