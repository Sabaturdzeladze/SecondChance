import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "../../context-api/Context";

export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Consumer>
    {value => {
      let user = JSON.parse(localStorage.getItem('user'));
      const isAdmin = user ? user.isAdmin : false;
      return (
        <Route
          {...rest}
          render={(
            props // Rendering components
          ) =>
            value.user.isAdmin || isAdmin ? (
              <Component {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      );
    }}
  </Consumer>
);
