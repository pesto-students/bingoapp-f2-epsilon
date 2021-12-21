import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";
// import { Button, Icon } from "semantic-ui-react";
function AdminChild({ children, adminUser }) {
  return adminUser ? children : <Navigate to="/" />;
}

function AdminRoute({ children }) {
  const { currentUser } = useAuth();
  const [adminUser, setAdminUser] = useState(false);
  useEffect(() => {
    if (currentUser) {
      currentUser.getIdTokenResult().then((idTokenResult) => {
        if (!!idTokenResult.claims.admin) {
          setAdminUser(idTokenResult.claims.admin);
        }
      });
    }
  });

  return (
    <div>
      {adminUser && <AdminChild adminUser={adminUser} children={children} />}
    </div>
  );
}

export default AdminRoute;
