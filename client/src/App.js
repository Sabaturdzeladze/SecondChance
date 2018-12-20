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
import { MainContent } from "./components/home-page/main/MainContent";
import Conversation from "./components/home-page/conversation/Conversation";
import Messenger from "./components/admin/Messenger/Messenger";
import { Footer } from "./components/home-page/footer/Footer";
import Cart from "./components/cart/Cart";
import Checkout from "./components/cart/Checkout";
import { Deals } from "./components/deals/Deals";
import { Newest } from "./components/deals/Newest";
import Dashboard from "./components/user/Dashboard";
import ShowProducts from "./components/admin/products/ShowProducts";
import EditProduct from "./components/admin/products/EditProduct";
import ShowUsers from "./components/admin/Users/ShowUsers";
import EditUser from "./components/admin/Users/EditUser";
import Wishlist from './components/user/Wishlist/Wishlist';
import UserNavbar from './components/user/UserNavbar';
import BoughtItems from "./components/user/bought-items/BoughtItems";
import Reviews from "./components/reviews/Reviews";

import "./App.css";

// clearing localstorage before app unloading
window.onload = () => {
  // if user hasn't logged in for 1 hour, then log user out
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
            <ProtectedRoute path="/admin/products" component={ShowProducts} />
            <ProtectedRoute path="/admin/messenger" component={Messenger} />
            <ProtectedRoute path="/admin/product/add" component={NewProduct} />
            <ProtectedRoute path="/admin/product/edit/:id" component={EditProduct} />
            <ProtectedRoute path="/admin/users" exact component={ShowUsers} />
            <ProtectedRoute path="/admin/users/edit/:id" component={EditUser} />
            <Route path="/dashboard" component={UserNavbar} />
            <Route path="/dashboard/checkout" component={Checkout}/>
            <Route path="/dashboard/history" component={BoughtItems} />
            <Route path="/dashboard/cart" component={Cart} />
            <Route path="/dashboard/wishlist" component={Wishlist} />
            <Route path="/dashboard" exact component={Dashboard}  />
            <Route path="/" component={Conversation} />
            <Route path="/" exact component={MainContent} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/products/search" component={Filtered} />
            <Route path="/products/item/:id" component={ProductDetails} />
            <Route path="/deals" component={Deals} />
            <Route path="/newest" component={Newest} />
            <Route path="/reviews" component={Reviews} />
            <Footer />
          </>
        </Router>
      </Provider>
    );
  }
}
export default App;
