import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin ,children,redirectPath="/auth" }) => {
  console.log(isAdmin)
 
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const validate = () =>{
    if (isAuthenticated === false) {
      return <Navigate to={redirectPath} />;
    }
    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to={redirectPath} />;
  }
    return  children ? children : <Outlet/>
  }
  return (
    <>
     {loading === false && validate()}
    </>
  );
};


export default ProtectedRoute;
