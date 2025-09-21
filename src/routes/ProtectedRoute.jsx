import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../provider/User";

const PrivateRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const { user } = useUser();

  if (!user) {
    // Not logged in → send to login
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Logged in but not authorized → show 403
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>403 - Forbidden</h1>
        <p>You don’t have permission to access this page.</p>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
