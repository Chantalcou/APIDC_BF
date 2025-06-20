import { React } from "react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

export const ContactOptions = () => {
  return (
    <>
      <section className="contact-section py-5" id="contacto">
        <div className="container">
          <h2 className="text-center mb-4" style={{ color: "#0a9d6d" }}>
            📬 Contacto Directo
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="contact-cards d-flex justify-content-center gap-4 flex-wrap">
                <a
                  href="https://wa.me/1555655766"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card whatsapp"
                >
                  <FaWhatsapp className="contact-icon" />
                  <div>
                    <h3>WhatsApp</h3>
                    <p>Respuesta inmediata</p>
                    <span className="cta-text">Enviar mensaje →</span>
                  </div>
                </a>

                <a href="mailto:info@apidc.ong" className="contact-card email">
                  <FaEnvelope className="contact-icon" />
                  <div>
                    <h3>Correo Electrónico</h3>
                    <p>Respondemos en 24hs</p>
                    <span className="cta-text">Enviar email →</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
