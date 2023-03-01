import React from "react";
import { Navigate } from "react-router-dom";
import { FirebaseContext } from "../contexts/FirebaseContext";

const ProtectedRoute = ({ children }) => {
  const { user } = FirebaseContext();

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
