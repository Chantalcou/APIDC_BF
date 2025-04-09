import React from "react";
import { FaHandHoldingHeart } from "react-icons/fa"; // Paquete de íconos FontAwesome

const AsociateButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        background: "#0a9d6d",
        color: "#ffffff",
        border: "none",
        padding: "12px 20px",
        borderRadius: "50px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "transform 0.2s, background 0.2s",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      className="hover-scale"
      onMouseEnter={(e) => (e.target.style.background = "#087d58")}
      onMouseLeave={(e) => (e.target.style.background = "#0a9d6d")}
    >
      <FaHandHoldingHeart style={{ fontSize: "20px" }} /> {/* Ícono de mano */}
      ¡Asociate ahora!

    </button>
  );
};

export default AsociateButton;
