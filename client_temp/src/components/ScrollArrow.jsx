// ScrollArrow.jsx
import React from "react";
import "./ScrollArrow.css";

const ScrollArrow = ({ onClick, color }) => {
  return (
    <div className="scroll-arrow" onClick={onClick}>
      <i className="fas fa-chevron-down" style={{ color: color }}></i>
    </div>
  );
};

export default ScrollArrow;
