import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

function AdminRoute({ children }) {
  const { currentUser } = useAuth();
  const [adminUser, setAdminUser] = useState(false);
  useEffect(() => {
    currentUser.getIdTokenResult().then((idTokenResult) => {
      if (!!idTokenResult.claims.admin) {
        setAdminUser(idTokenResult.claims.admin);
        console.log(idTokenResult.claims.admin);
      }
    });
  });

  return adminUser ? children : <Navigate to="/" />;
}

export default AdminRoute;
