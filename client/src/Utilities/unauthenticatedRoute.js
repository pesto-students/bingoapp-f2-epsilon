import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

function UnauthenticatedRoute({ children }) {
  const { currentUser } = useAuth();
  return !currentUser ? children : <Navigate to="/" />;
}

export default UnauthenticatedRoute;
