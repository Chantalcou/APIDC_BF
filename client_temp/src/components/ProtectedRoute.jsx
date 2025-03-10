// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, user } = useSelector((state) => state);

//   if (!isAuthenticated) {
//     console.log("No autenticado, redirigiendo...");
//     return <Navigate to="/" />;
//   }

//   if (user && !user) {
//     console.log("No es admin, redirigiendo...");
//     return <Navigate to="/" />;
//   }

//   console.log("Renderizando children...");
//   return children; // Renderiza el Dashboard si todo está bien
// };

// export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated } = useAuth0();
  const { user, isSocioVerified, isAdmin,getAllNotAdmin } = useSelector((state) => state);

  // Estados de carga
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticación y roles después de 1 segundo (simulación)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div>Cargando verificación...</div>;
  }

  // Lógica de protección
  if (!isAuthenticated) {
    console.log("Redirigiendo a login...");
    return <Navigate to="/" replace />;
  }

  // Verificación de roles
  if (requiredRole === "socio" && !isSocioVerified) {
    console.log("Acceso socio no autorizado");
    return <Navigate to="/no-autorizado" replace />;
  }

  if (requiredRole === "admin" && !isAdmin) {
    console.log("Acceso admin no autorizado");
    return <Navigate to="/no-autorizado" replace />;
  }


  if (
    !isAuthenticated ||
    !getAllNotAdmin.some(
      (u) =>
        u.email?.toLowerCase() === user?.email?.toLowerCase() &&
        ["gestor", "premium"].includes(u.membershipType)
    )
  ) {
    console.log('funciona la ruta???????')
    return <Navigate to="/" replace />;
  }
  



  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole === "socio" && !isSocioVerified) {
    return <Navigate to="/no-autorizado" replace />;
  }

  if (requiredRole === "products" ) {
    return <Navigate to="/no-autorizado" replace />;
  }

  console.log("Acceso concedido a:", requiredRole);
  return children;
};

export default ProtectedRoute;
