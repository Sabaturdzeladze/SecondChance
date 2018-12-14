import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "../../context-api/Context";

export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Consumer>
    {value => {
      const user = JSON.parse(localStorage.getItem('user'));
      return (
        <Route
          {...rest}
          render={(
            props // Rendering components
          ) =>
            value.user.isAdmin || user.isAdmin ? (
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
