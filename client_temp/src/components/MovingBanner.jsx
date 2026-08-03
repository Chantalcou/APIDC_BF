import React from "react";
import { FaHeart } from "react-icons/fa";
import "./MovingBanner.css";

const PARTNER_LOGOS = [
  {
    id: "ministerio-salud",
    name: "Ministerio de Salud",
    image:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/v1744222480/ministerio_salud_bpsncq.jpg",
  },
  {
    id: "andreani",
    name: "Andreani",
    image:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/v1736345614/andreani_e9flk9.png",
  },
  {
    id: "conicet",
    name: "CONICET",
    image:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/v1736344234/conicet_eg7ncj.jpg",
  },
];

/*
  Se repite internamente la lista para que la animación
  siga cubriendo pantallas grandes sin espacios vacíos.
*/
const MARQUEE_ITEMS = Array.from(
  { length: 3 },
  () => PARTNER_LOGOS
).flat();

const LogoGroup = ({ hidden = false }) => {
  return (
    <ul
      className="ap-partners__group"
      aria-hidden={hidden ? "true" : undefined}
    >
      {MARQUEE_ITEMS.map((partner, index) => (
        <li
          className="ap-partners__item"
          key={`${hidden ? "copy" : "original"}-${partner.id}-${index}`}
        >
          <div className="ap-partners__logo-card">
            <img
              className="ap-partners__logo"
              src={partner.image}
              alt={hidden ? "" : partner.name}
              loading="lazy"
              decoding="async"
              draggable="false"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

const MovingBanner = () => {
  return (
    <section
      className="ap-partners"
      aria-labelledby="ap-partners-title"
    >
      <div className="ap-partners__decoration ap-partners__decoration--left" />
      <div className="ap-partners__decoration ap-partners__decoration--right" />

      <div className="ap-partners__header">
        <span className="ap-partners__eyebrow">
          Red institucional
        </span>

        <h2
          className="ap-partners__title"
          id="ap-partners-title"
        >
          Nos acompañan
          <span
            className="ap-partners__heart-wrapper"
            aria-hidden="true"
          >
            <FaHeart className="ap-partners__heart" />
          </span>
        </h2>

        <p className="ap-partners__description">
          Construimos vínculos que fortalecen nuestro trabajo,
          amplían nuestro alcance y acompañan el desarrollo de
          nuevos proyectos.
        </p>
      </div>

      <div className="ap-partners__marquee">
        <div className="ap-partners__fade ap-partners__fade--left" />

        <div className="ap-partners__viewport">
          <div className="ap-partners__track">
            <LogoGroup />
            <LogoGroup hidden />
          </div>
        </div>

        <div className="ap-partners__fade ap-partners__fade--right" />
      </div>
    </section>
  );
};

export default MovingBanner;