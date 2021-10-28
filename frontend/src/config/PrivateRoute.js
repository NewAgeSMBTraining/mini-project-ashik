import { Redirect, Route } from "react-router";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("jwtToken") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;
