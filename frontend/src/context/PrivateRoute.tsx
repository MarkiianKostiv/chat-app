import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

const PrivateRoute: React.FC = () => {
  const { authUser } = useAuthContext();

  if (!authUser) {
    return (
      <Navigate
        to='/sign-up'
        replace
      />
    );
  }

  return <Outlet />;
};

export default PrivateRoute;
