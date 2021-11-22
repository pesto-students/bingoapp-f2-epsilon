import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

function AuthRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

export default AuthRoute;
