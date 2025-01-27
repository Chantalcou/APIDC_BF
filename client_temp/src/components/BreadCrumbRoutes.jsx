import React from "react";
import './BreadCrumRoutes.css'
import { Link, useLocation } from "react-router-dom";

const breadcrumbRoutes = {
  "/": "Inicio",
  "/gestor": "Gestor",
  "/dashboard": "Dashboard",
  "/contacto": "Contacto",
  "/SocioConReprocan": "SocioConReprocan",
  "/SocioSinReprocan": "SocioSinReprocan",
  "/newsletter": "Newsletter",
  "/membershipSection":"Membresias",
    "/products":"Productos"
};

const Breadcrumbs = () => {
  const location = useLocation(); // Hook para obtener la ubicación actual
  const paths = location.pathname.split("/").filter(Boolean);

  let accumulatedPath = "";

  return (
    <nav aria-label="breadcrumbs">
      <ul style={{ display: "flex", listStyle: "none", gap: "8px" }}>
        <li>
          <Link      style={{ color: "#0a9d6d" }} to="/">Inicio</Link> {/* Siempre muestra el enlace a la raíz */}
        </li>
        {paths.map((path, index) => {
          accumulatedPath += `/${path}`;
          return (
            <li key={index}>
              <span style={{ margin: "0 5px" }}>/</span> {/* Separador */}
              <Link      style={{ color: "#0a9d6d" }} to={accumulatedPath}>
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
