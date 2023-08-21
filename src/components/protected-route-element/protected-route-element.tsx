import React, { FC } from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

type ProtectedRouteElementProps = {
  children: React.ReactNode| React.ReactElement;
  onlyUnAuth?: boolean;
}

const ProtectedRouteElement: FC<ProtectedRouteElementProps> = ({ children, onlyUnAuth }) => {
  const  user  = useSelector((state: any)=>state.rootReducer.user?.user.name)
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


  return (<>{children}</>);
};

export default ProtectedRouteElement;
