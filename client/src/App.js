import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Provider from "./context-api/Context";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Admin from "./components/admin/Admin";
import Header from "./components/home-page/header/Header";
import Filtered from "./components/searching/Filtered";
import ProductDetails from "./components/searching/ProductDetails";
import NewProduct from "./components/admin/products/NewProduct";

import "./App.css";

// clearing localstorage before app unloading
window.onload = () => {
  // if user haven't logged in for 1 hour, then log user out
  if (
    !JSON.parse(localStorage.getItem("remember")) &&
    new Date() - JSON.parse(localStorage.getItem("expiration")) >= 0
  ) {
    localStorage.clear();
  }
};

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <>
            <Header />
            <ProtectedRoute path="/admin" component={Admin} />

            <ProtectedRoute path="/admin/product/add" component={NewProduct} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/products/search" component={Filtered} />
            <Route path="/products/item/:id" component={ProductDetails} />
          </>
        </Router>
      </Provider>
    );
  }
}

export default App;
