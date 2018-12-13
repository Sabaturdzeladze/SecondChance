import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Provider, { Consumer } from "./context-api/Context";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Admin from "./components/admin/Admin";
import Header from "./components/home-page/header/Header";
import Filtered from "./components/searching/Filtered";
import history from './components/common/history';

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <>
            <Header />
            <ProtectedRoute path="/admin" component={Admin} />
            <Consumer>
              {value => {
                return (
                  <>
                    <Route
                      path="/login"
                      render={() => <Login history={history} value={value} />}
                    />
                    <Route
                      path="/register"
                      render={() => <Register value={value} />}
                    />
                  </>
                );
              }}
            </Consumer>
            <Route path="/products/search" component={Filtered} />
          </>
        </Router>
      </Provider>
    );
  }
}

export default App;
