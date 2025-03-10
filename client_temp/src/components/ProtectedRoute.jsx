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

// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useAuth0 } from "@auth0/auth0-react";

// const ProtectedRoute = ({ children, requiredRole }) => {
//   console.log(requiredRole, "required roles");
//   const { isAuthenticated, isLoading } = useAuth0();
//   const { user, isAdmin, getAllNotAdmin } = useSelector((state) => state);

//   if (isLoading) return <div>Cargando...</div>;

//   // Verificación de autenticación
//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

  // Verificación de roles
  // if (requiredRole !== "admin") {
  //   return <Navigate to="/no-autorizado" replace />;
  // }
 // Verificación de roles
//  if (requiredRole === "admin") {
//   if (!isAdmin) {
//     return <Navigate to="/no-autorizado" replace />;
//   }
//   return children;
// }

//   // Verificación adicional para productos
//   if (requiredRole === "products") {
//     const hasProductAccess = getAllNotAdmin.some(
//       (u) =>
//         u.email?.toLowerCase() === user?.email?.toLowerCase() &&
//         ["gestor", "premium"].includes(u.membershipType)
//     );
//     return <Navigate to="/products" replace />;

//     if (!hasProductAccess) {
//       return <Navigate to="/no-autorizado" replace />;
//     }
//   }

//   return children;
// };
// const ProtectedRoute = ({ children, requiredRole }) => {
//   const { isAuthenticated } = useAuth0();
//   const { user, isSocioVerified, isAdmin, getAllNotAdmin } = useSelector(
//     (state) => state
//   );

//   // Estados de carga
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Verificar autenticación y roles después de 1 segundo (simulación)
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return <div>Cargando verificación...</div>;
//   }

//   // Lógica de protección
//   if (!isAuthenticated) {
//     console.log("Redirigiendo a login...");
//     return <Navigate to="/" replace />;
//   }

//   // Verificación de roles
//   if (requiredRole === "socio" && !isSocioVerified) {
//     console.log("Acceso socio no autorizado");
//     return <Navigate to="/no-autorizado" replace />;
//   }

//   if (requiredRole === "admin" && !isAdmin) {
//     console.log("Acceso admin no autorizado");
//     return <Navigate to="/no-autorizado" replace />;
//   }

//   if (
//     !isAuthenticated ||
//     !getAllNotAdmin.some(
//       (u) =>
//         u.email?.toLowerCase() === user?.email?.toLowerCase() &&
//         ["gestor", "premium"].includes(u.membershipType)
//     )
//   ) {
//     console.log("funciona la ruta???????");
//     return <Navigate to="/" replace />;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   if (requiredRole === "socio" && !isSocioVerified) {
//     return <Navigate to="/no-autorizado" replace />;
//   }

//   if (requiredRole === "products") {
//     return <Navigate to="/no-autorizado" replace />;
//   }

//   console.log("Acceso concedido a:", requiredRole);
//   return children;
// };

// export default ProtectedRoute;
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, isLoading, user: auth0User } = useAuth0();
  const { isAdmin, getAllNotAdmin } = useSelector((state) => state);

  // Estado de carga
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  // Verificación de autenticación
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Verificación de roles
  if (requiredRole === "admin") {
    if (!isAdmin) {
      return <Navigate to="/no-autorizado" replace />;
    }
    return children;
  }

  // Verificación para acceso a productos (gestor o premium)
  if (requiredRole === "products") {
    if (!auth0User?.email) {
      return <Navigate to="/no-autorizado" replace />;
    }

    const hasProductAccess = getAllNotAdmin.some(
      (u) =>
        u.email?.toLowerCase() === auth0User.email?.toLowerCase() &&
        ["gestor", "premium"].includes(u.membershipType)
    );

    if (!hasProductAccess) {
      return <Navigate to="/no-autorizado" replace />;
    }

    return children;
  }

  // Si no se especifica un rol requerido, permitir acceso
  return children;
};

export default ProtectedRoute;