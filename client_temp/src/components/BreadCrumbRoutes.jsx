import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation } from "react-router-dom";
import "./BreadCrumRoutes.css";

const breadcrumbRoutes = {
  "/": "Inicio",
  "/membershipSection/gestor": "Gestor",
  "/dashboard": "Dashboard",
  "/contacto": "Contacto",
  "/membershipSection/SocioConReprocan": "Socio con Reprocann",
  "/membershipSection/socioSinReprocan": "Socio adherente",
  "/newsletter": "Newsletter",
  "/membershipSection": "Categorías",
  "/products": "Cultivo",
  "/shop": "Tienda",
  "/socio": "Socios",
  "/newsLetter": "News Letter",
  "/gallery": "Galeria",
  "/learnWithUs": "Capacitaciones",
};
const Breadcrumbs = () => {
  const { isAuthenticated, user } = useAuth0();
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);
  let accumulatedPath = "";

  return (
    <div className="breadcrumbs-container">
      <nav aria-label="breadcrumbs" className="breadcrumbs-nav">
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          {paths.map((path, index) => {
            accumulatedPath += `/${path}`;
            return (
              <li key={index}>
                <span className="separator">/</span>
                <Link to={accumulatedPath}>
                  {breadcrumbRoutes[accumulatedPath] || path}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {isAuthenticated && user && (
        <div className="welcome-container">
          <span className="welcome-message">¡Bienvenido, {user.name}!</span>
        </div>
      )}
    </div>
  );
};

export default Breadcrumbs;
