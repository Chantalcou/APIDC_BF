import React from "react";
// import { Button } from "react-bootstrap";
import "./Button.css";

const ButtonComponent = ({ text, onClick, color, customClass,style,fontSize }) => {
  return (
    <button
      onClick={onClick}
      className={`custom-button-outline ${customClass || ""}`}
      style={{
        background: color?.background || "transparent",
        color: color?.text || "black",
        border: color?.border || "none",
        fontSize:fontSize,
        ...style 
      }}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
