// Donations.jsx
import React from "react";
import { FaLock, FaArrowRight, FaCheckCircle, FaLeaf, FaQrcode } from "react-icons/fa";
import "./Donations.css";

const Donations = () => {
  const IMAGE_URL =
    "https://res.cloudinary.com/dqgjcfosx/image/upload/v1767020389/apidc_botellas_cropped_qs2u2k.png";

  const FORM_URL =
    "https://docs.google.com/forms/d/1guSRMEtLnfwWshZFkZ8TDF1DlSh2y6av8TWgYh4RsHY/edit";

  const QR_URL =
    "https://res.cloudinary.com/dqgjcfosx/image/upload/v1767026521/frame_14_ldhal7.png";

  const benefits = [
    "Donación de aceite a hospitales",
    "Sostenimiento de investigación y seguimiento clínico",
    "Producción, insumos y logística para garantizar continuidad",

  ];

  const handleOpenForm = () => {
    window.open(FORM_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="donate-section" id="donaciones">
      <div className="donate-bg" aria-hidden="true">
        <div className="bg-overlay" />
      </div>

      <div className="donate-container">
        <header className="donate-header">
          <div className="donate-badge">
            <FaLeaf className="badge-icon" />
            <span>DONACIONES</span>
          </div>

          <h1 className="donate-title">
            Colaborá con <span className="title-highlight">APIDC</span>
          </h1>

          <p className="donate-subtitle">
            Tu aporte sostiene donaciones a hospitales, investigación y continuidad operativa.
            <strong> Un gesto simple, un impacto real.</strong>
          </p>
        </header>

        <div className="donate-content">
          {/* Imagen */}
          <div className="donate-media">
            <div className="media-frame">
              <img
                src={IMAGE_URL}
                alt="APIDC - Producción con propósito social"
                className="media-image"
                loading="lazy"
              />
            </div>
            <p className="media-caption">APIDC — Impacto real, propósito social</p>
          </div>

          {/* Card */}
          <div className="donate-card-wrapper">
            <div className="donate-card">
              {/* Header card */}
              <div className="card-header">
                <h2 className="card-title">
                  Registrá tu colaboración <FaLock className="lock-icon" />
                </h2>
                <p className="card-description">
                  Elegí tu forma: completá el formulario o escaneá el QR desde el celular.
                </p>
              </div>

              {/* Beneficios */}
              <div className="card-benefits">
                <h3 className="benefits-title">Por qué colaborar</h3>
                <ul className="benefits-list">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="benefit-item">
                      <FaCheckCircle className="benefit-icon" />
                      <span className="benefit-text">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA doble */}
              <div className="card-action">
                <div className="cta-split" role="group" aria-label="Acciones para donar">
                  {/* Botón */}
                  <button
                    type="button"
                    className="cta-half cta-button"
                    onClick={handleOpenForm}
                    aria-label="Ir al formulario de donaciones"
                  >
                    <span className="cta-title-row">
                      Ir al formulario <FaArrowRight className="arrow-icon" />
                    </span>
                    <span className="cta-sub">
                      Rápido • Seguro • Transparente
                    </span>
                  </button>

                  {/* QR */}
                  <a
                    className="cta-half cta-qr"
                    href={FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir formulario desde el QR"
                  >
                    <div className="qr-top">
                      <FaQrcode className="qr-icon" />
                      <span className="qr-label">Escanear QR</span>
                    </div>

                    <div className="qr-frame">
                      <img
                        src={QR_URL}
                        alt="QR para formulario de donaciones APIDC"
                        className="qr-image"
                        loading="lazy"
                      />
                    </div>

                    <span className="qr-sub">Abrir en el teléfono</span>
                  </a>
                </div>

                <p className="security-note">
                  <FaLock className="security-icon" />
                  Página segura. Tus datos están protegidos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donations;
