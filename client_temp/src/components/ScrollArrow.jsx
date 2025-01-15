// ScrollArrow.jsx
import React from 'react';
import './ScrollArrow.css'; // Para estilos personalizados

const ScrollArrow = ({ onClick }) => {
  return (
    <div className="scroll-arrow" onClick={onClick}>
      <i className="fas fa-chevron-down"></i> {/* Ícono de la flecha */}
    </div>
  );
};

export default ScrollArrow;




