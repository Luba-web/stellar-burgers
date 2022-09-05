import React, { Redirect, Route } from "react-router-dom";
import { useSelector } from "../services/hooks";
import { FC, ReactNode } from "react"

type TProtectedRoute = {
  children?: ReactNode;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: FC<TProtectedRoute> = ({ children, ...rest }) => {
  const user = useSelector((store) => store.user.user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
