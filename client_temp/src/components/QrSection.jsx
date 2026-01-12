import React from "react";
import './QrSection.css'

const QrSection = () => {
  return (
    <div className="asociate-section-QR text-center py-5">
      <h2 className="mb-3">¡Asociate a nuestra comunidad!</h2>
      <p className="mb-4">Escaneá el código QR para completar el formulario de asociación.</p>
      <a
        href="https://form.jotform.com/apidcasociacion/formulario-registro-APIDC-REPROCANN"
        rel="no-follow"
        target="_blank"
        className="d-block mx-auto"
      >
        <img
          src="https://www.jotform.com/uploads/apidcasociacion/form_files/250913776216662_1743600755_qrcode_muse.png"
          width="100%"
          style={{ maxWidth: "200px" }}
          alt="QR Code para asociarse"
        />
      </a>
    </div>
  );
};

export default QrSection;
