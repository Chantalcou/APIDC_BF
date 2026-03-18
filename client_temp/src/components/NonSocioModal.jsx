import React from 'react';
import './NonSocioModal.css';

const NonSocioModal = ({ show, onClose, onAsociarme, qrImageUrl }) => {
  if (!show) return null;

  return (
    <div className="non-socio-modal-overlay" onClick={onClose}>
      <div className="non-socio-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="non-socio-modal-title">Sumate a APIDC</h2>
        <p className="non-socio-modal-message">
          Esta sección está habilitada solo para socios.
          Escaneá el QR y conocé cómo asociarte.
        </p>
        <div className="non-socio-modal-qr-container">
          <img src={qrImageUrl} alt="QR para asociarse" className="non-socio-modal-qr" />
        </div>
        <div className="non-socio-modal-buttons">
     
          <button className="non-socio-modal-btn non-socio-modal-btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NonSocioModal;