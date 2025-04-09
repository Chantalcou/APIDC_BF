import React from "react";
import "./MovingBanner.css";
import { FaHeart } from "react-icons/fa";


const MovingBanner = () => {
  const logos = [
    "https://res.cloudinary.com/dqgjcfosx/image/upload/v1736345698/ministerio_arg_o5onnp.jpg",
    "https://res.cloudinary.com/dqgjcfosx/image/upload/v1736345614/andreani_e9flk9.png",
    "https://res.cloudinary.com/dqgjcfosx/image/upload/v1736344234/conicet_eg7ncj.jpg",
    "https://res.cloudinary.com/dqgjcfosx/image/upload/v1736345698/ministerio_arg_o5onnp.jpg",
    "https://res.cloudinary.com/dqgjcfosx/image/upload/v1736345614/andreani_e9flk9.png",
    "https://res.cloudinary.com/dqgjcfosx/image/upload/v1736344234/conicet_eg7ncj.jpg",
    "https://res.cloudinary.com/dqgjcfosx/image/upload/v1736345698/ministerio_arg_o5onnp.jpg",
    "https://res.cloudinary.com/dqgjcfosx/image/upload/v1736345614/andreani_e9flk9.png",
    "https://res.cloudinary.com/dqgjcfosx/image/upload/v1736344234/conicet_eg7ncj.jpg",
  ];

  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="moving-banner">
        <h1 className="banner-title_banner">
        Nos Acompañan <FaHeart className="heart-icon" />
      </h1>
      <div className="moving-logos">
        {duplicatedLogos.map((logo, index) => (
          <img key={index} src={logo} alt={`logo-${index}`} className="logo" />
        ))}
      </div>
    </div>
  );
};

export default MovingBanner;
