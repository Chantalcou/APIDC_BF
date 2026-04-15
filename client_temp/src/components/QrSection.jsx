import React from "react";
import "./QrSection.css";

const QrSection = () => {
  const FORM_URL = "https://www.jotform.com/build/250913776216662";

  return (
    <div className="asociate-section-QR text-center py-5">
      <div className="qr-section-container">
        <h2 className="mb-3">¡Asociate a nuestra comunidad!</h2>

        <p className="mb-4">
          Podés completar el formulario de asociación escaneando el código QR o
          ingresando directamente desde el LINK.
        </p>

        <div className="qr-options-wrapper">
          <a
            href={FORM_URL}
            rel="no-follow noopener noreferrer"
            target="_blank"
            className="qr-image-link"
          >
            <img
              src="https://www.jotform.com/uploads/apidcasociacion/form_files/250913776216662_1743600755_qrcode_muse.png"
              className="qr-image"
              alt="QR Code para asociarse"
            />
          </a>

          <div className="qr-link-box">
         

            <a
              href={FORM_URL}
              rel="no-follow noopener noreferrer"
              target="_blank"
              className="qr-form-button"
            >
              Ir al formulario de asociación
            </a>

            <a
              href={FORM_URL}
              rel="no-follow noopener noreferrer"
              target="_blank"
              className="qr-direct-link"
            >
              
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrSection;