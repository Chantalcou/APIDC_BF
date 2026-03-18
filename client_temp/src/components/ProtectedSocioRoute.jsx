import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedSocioRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  const socioAuthorized = localStorage.getItem("socioAuthorized") === "true";

  if (isLoading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Cargando...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (!socioAuthorized) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedSocioRoute;