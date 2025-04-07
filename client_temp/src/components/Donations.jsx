import React, { useState } from "react";
import {
  FaHandsHelping,
  FaLeaf,
  FaBalanceScale,
  FaCopy,
  FaWhatsapp,
} from "react-icons/fa";
import "./Donations.css";

const Donations = () => {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleWhatsappDonation = () => {
    const message = `Hola, quiero realizar una donación y necesito información para completar la transferencia.`;
    const whatsappUrl = `https://wa.me/+5491112345678?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCopyCBU = () => {
    navigator.clipboard.writeText("0000000000000000000000");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
    
      <div className="donation-background_image">
        <section className="donacion-container">
          {/* Modal para transferencia */}
          {showTransferModal && (
            <div className="transfer-modal">
              <div className="modal-content">
                <button
                  className="close-modal"
                  onClick={() => setShowTransferModal(false)}
                >
                  &times;
                </button>
                <h3>Datos para Transferencia Bancaria</h3>
                <div className="bank-details">
                  <p>
                    <strong>Nombre de la Asociación:</strong>
                  </p>
                  <p>Asociación Cannábica Solidaria</p>

                  <p>
                    <strong>CBU:</strong>
                  </p>
                  <div className="cbu-container">
                    <span>0000000000000000000000</span>
                    <button onClick={handleCopyCBU} className="copy-button">
                      <FaCopy /> {copied ? "¡Copiado!" : "Copiar"}
                    </button>
                  </div>

                  <p>
                    <strong>Alias:</strong>
                  </p>
                  <p>APIDC.ONG</p>
                </div>
                <button
                  className="whatsapp-button"
                  onClick={handleWhatsappDonation}
                >
                  <FaWhatsapp /> Confirmar por WhatsApp
                </button>
              </div>
            </div>
          )}

          {/* Contenido existente */}
          <div className="donacion-header">
            <h2 className="donacion-titulo">
              <FaLeaf className="icono-titulo" />
              Tu apoyo transforma vidas
            </h2>
            <p className="donacion-subtitulo">
              Cada contribución acerca el acceso a la salud
            </p>
          </div>

          <div className="razones-grid">
   
          </div>

          <div className="cta-container">
            <button
              className="donar-button"
              onClick={() => setShowTransferModal(true)}
            >
              Quiero ser parte del cambio
              <span className="button-badge">Donaciones</span>
            </button>
            <p className="garantia-text">
              <span>✓</span> Transparencia certificada - Recibos digitales -
              Destino controlado
            </p>
          </div>
        </section>
      </div>

    </>
  );
};

export default Donations;
