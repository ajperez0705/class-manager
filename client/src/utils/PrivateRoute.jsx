import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? <Component {...props} /> : <Redirect to="/auth" />;
      }}
    ></Route>
  );
}

export default PrivateRoute;
