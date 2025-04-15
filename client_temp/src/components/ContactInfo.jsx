import React from "react";
import "./ContactInfo.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <section className="contact-info-section">
      <div className="contact-info-container">
        <div className="contact-details">
          <h2 className="section-title">Datos de contacto</h2>
          <div className="contact-item">
            <FaEnvelope className="icon" />
            <div>
              <span className="contact-label">EMAIL</span>
              <p className="contact-text">info@apidc.ong</p>
            </div>
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="icon" />
            <div>
              <span className="contact-label">Teléfono / Whatsapp</span>
              <p className="contact-text">+54 9 11-5977-4282</p>
            </div>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt className="icon" />
            <div>
              <span className="contact-label">Ubicación</span>
              <p className="contact-text">
                Roque Saenz Peña 1054, San Isidro, Buenos Aires, Argentina
              </p>
            </div>
          </div>
        </div>
        <div className="contact-image-container">
          <img
            src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1744730705/Dise%C3%B1o_sin_t%C3%ADtulo_3_o3h9vp.png"
            alt="Ubicación"
            className="contact-image"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
