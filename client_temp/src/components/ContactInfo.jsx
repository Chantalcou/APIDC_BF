import React from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import "./ContactInfo.css";

const CONTACT_DATA = [
  {
    id: "email",
    label: "Correo electrónico",
    value: "apidcasociacion@gmail.com",
    href: "mailto:apidcasociacion@gmail.com",
    actionText: "Enviar correo",
    Icon: FaEnvelope,
    external: false,
  },
  {
    id: "whatsapp",
    label: "Teléfono y WhatsApp",
    value: "+54 9 11 5565-5766",
    href: "https://wa.me/5491155655766",
    actionText: "Abrir WhatsApp",
    Icon: FaWhatsapp,
    external: true,
  },
  {
    id: "address",
    label: "Sede administrativa",
    value:
      "Roque Sáenz Peña 1054, San Isidro, Buenos Aires, Argentina",
    href:
      "https://www.google.com/maps/search/?api=1&query=Roque+Saenz+Pena+1054+San+Isidro+Buenos+Aires+Argentina",
    actionText: "Ver ubicación",
    Icon: FaMapMarkerAlt,
    external: true,
  },
];

const ContactCard = ({
  label,
  value,
  href,
  actionText,
  Icon,
  external,
}) => {
  return (
    <article className="ap-contact__item">
      <div className="ap-contact__icon-box" aria-hidden="true">
        <Icon className="ap-contact__icon" />
      </div>

      <div className="ap-contact__item-content">
        <span className="ap-contact__label">{label}</span>

        <p className="ap-contact__value">{value}</p>

        <a
          className="ap-contact__link"
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={`${actionText}: ${value}`}
        >
          <span>{actionText}</span>
          <FaArrowRight
            className="ap-contact__link-icon"
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  );
};

const ContactInfo = () => {
  return (
    <section
      className="ap-contact"
      id="contacto"
      aria-labelledby="ap-contact-title"
    >
      <div
        className="ap-contact__decoration ap-contact__decoration--top"
        aria-hidden="true"
      />

      <div
        className="ap-contact__decoration ap-contact__decoration--bottom"
        aria-hidden="true"
      />

      <div className="ap-contact__container">
        <div className="ap-contact__content">
          <header className="ap-contact__header">
            <span className="ap-contact__eyebrow">
              Información institucional
            </span>

            <h2
              className="ap-contact__title"
              id="ap-contact-title"
            >
              Datos de contacto
            </h2>

     
          </header>

          <address className="ap-contact__list">
            {CONTACT_DATA.map((contact) => (
              <ContactCard
                key={contact.id}
                {...contact}
              />
            ))}
          </address>

          <div className="ap-contact__notice">
            <span
              className="ap-contact__notice-dot"
              aria-hidden="true"
            />

            <p className="ap-contact__notice-text">
              Para una atención más ágil, comunicate por
              WhatsApp indicando tu nombre y el motivo de la
              consulta.
            </p>
          </div>
        </div>

        <div className="ap-contact__visual">
          <div className="ap-contact__image-card">
            <div
              className="ap-contact__image-accent"
              aria-hidden="true"
            />

            <img
              className="ap-contact__image"
              src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1744730705/Dise%C3%B1o_sin_t%C3%ADtulo_3_o3h9vp.png"
              alt="Ubicación de la sede de APIDC en San Isidro"
              loading="lazy"
              decoding="async"
            />

            <div className="ap-contact__location-card">
              <div
                className="ap-contact__location-icon-box"
                aria-hidden="true"
              >
                <FaMapMarkerAlt className="ap-contact__location-icon" />
              </div>

              <div className="ap-contact__location-content">
                <span className="ap-contact__location-label">
                  Nuestra sede
                </span>

                <strong className="ap-contact__location-name">
                  San Isidro, Buenos Aires
                </strong>
              </div>
            </div>
          </div>

          <div
            className="ap-contact__visual-pattern"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;