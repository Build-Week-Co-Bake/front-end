import React from "react";
import { Route, Redirect } from "react-router-dom";

export function ProtectedRoute(props) {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(renderprops) => {
        return localStorage.getItem("token") ? (
          <Component {...renderprops} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}
