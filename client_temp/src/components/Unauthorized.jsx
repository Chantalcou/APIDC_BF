import React from "react";

const Unauthorized = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "150px" }}>
      <h1>Acceso denegado</h1>
      <p>No tienes permiso para acceder a esta página.</p>
      <a href="/">Volver al inicio</a>
    </div>
  );
};

export default Unauthorized;
