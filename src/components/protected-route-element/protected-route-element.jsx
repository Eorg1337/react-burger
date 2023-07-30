import React, { useContext } from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../app/App";

const ProtectedRouteElement = ({ children, onlyUnAuth = false }) => {
  const  user  = useSelector((state)=>state.rootReducer.user?.user.name)
  const [isLoading, setIsLoading] = React.useState(true);
  const isAuthChecked = true;
  const location = useLocation();

  if (!isAuthChecked) return <div>Loading...</div>;

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }


  return children;
};

export default ProtectedRouteElement;
