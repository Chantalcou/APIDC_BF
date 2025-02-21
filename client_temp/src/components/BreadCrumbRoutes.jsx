import React from "react";
import "./BreadCrumRoutes.css";
import { Link, useLocation } from "react-router-dom";

const breadcrumbRoutes = {
  "/": "Inicio",
  "/membershipSection/gestor": "Gestor",
  "/dashboard": "Dashboard",
  "/contacto": "Contacto",
  "/membershipSection/SocioConReprocan": "Socio Premiun",
  "/membershipSection/socioSinReprocan": "Socio adherente",
  "/newsletter": "Newsletter",
  "/membershipSection": "Categorías",
  "/products": "Productos",
  "/shop": "Tienda",
};

const Breadcrumbs = () => {
  const location = useLocation(); // Hook para obtener la ubicación actual
  const paths = location.pathname.split("/").filter(Boolean);

  let accumulatedPath = "";

  return (
    <nav aria-label="breadcrumbs">
      <ul style={{ display: "flex", listStyle: "none", gap: "8px" }}>
        <li>
          <Link style={{ color: "#ffff" }} to="/">
            Inicio
          </Link>{" "}
          {/* Siempre muestra el enlace a la raíz */}
        </li>
        {paths.map((path, index) => {
          accumulatedPath += `/${path}`;
          return (
            <li key={index}>
              <span style={{ margin: "0 5px" }}>/</span> {/* Separador */}
              <Link style={{ color: "#ffff" }} to={accumulatedPath}>
                {breadcrumbRoutes[accumulatedPath] || path}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
