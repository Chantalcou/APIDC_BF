import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state);


  if (!isAuthenticated) {
    console.log("No autenticado, redirigiendo...");
    return <Navigate to="/" />;
  }

  if (user && !user) {
    console.log("No es admin, redirigiendo...");
    return <Navigate to="/" />;
  }

  console.log("Renderizando children...");
  return children; // Renderiza el Dashboard si todo está bien
};

export default ProtectedRoute;
