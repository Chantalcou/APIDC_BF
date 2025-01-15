import React from "react";
import "./MovingBanner.css";

const MovingBanner = ({ logos }) => {
  // Aseguramos duplicar los logos
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="moving-banner">
      <div className="moving-logos">
        {duplicatedLogos.map((logo, index) => (
          <img key={index} src={logo.src} alt={logo.alt} className="logo" />
        ))}
      </div>
    </div>
  );
};

export default MovingBanner;
