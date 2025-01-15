// SpinnerComponent.jsx
import React from "react";
import "./SpinnerComponent.css"; // Estilos del spinner

const SpinnerComponent = () => {
  return (
    <div className="spinner-overlay">
      <img
        src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1725973641/apidc-logo_hz26kf.png"
        alt="Cargando..."
        className="spinner-logo"
      />
    </div>
  );
};

export default SpinnerComponent;
