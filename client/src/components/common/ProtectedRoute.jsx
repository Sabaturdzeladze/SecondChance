import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "../../context-api/Context";

export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Consumer>
    {value => (
      <Route
        {...rest}
        render={(
          props // Rendering components
        ) =>
          value.isLogged ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    )}
  </Consumer>
);
