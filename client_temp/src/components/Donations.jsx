import React from 'react';
import { FaHandsHelping, FaLeaf, FaBalanceScale } from 'react-icons/fa';
import './Donations.css';

const Donations = () => {
  return (
    <section className="donacion-container">
      <div className="donacion-header">
        <h2 className="donacion-titulo">
          <FaLeaf className="icono-titulo" />
          Tu apoyo transforma vidas
        </h2>
        <p className="donacion-subtitulo">Cada contribución acerca el acceso a la salud</p>
      </div>

      <div className="razones-grid">
        <div className="razon-card">
          <FaHandsHelping className="razon-icono" />
          <div className="razon-content">
            <h3>Autogestión comprometida</h3>
            <p>Organización sin fines de lucro que promueve el autocultivo seguro y la educación terapéutica</p>
          </div>
        </div>

        <div className="razon-card middle-card">
          <div className="razon-indicador">100%</div>
          <div className="razon-content">
            <h3>Transparencia total</h3>
            <p>Recursos destinados íntegramente a talleres nacionales y apoyo legal a familias</p>
          </div>
        </div>

        <div className="razon-card">
          <FaBalanceScale className="razon-icono" />
          <div className="razon-content">
            <h3>Lucha legislativa</h3>
            <p>Tu aporte fortalece nuestra batalla por marcos legales justos y no criminalizantes</p>
          </div>
        </div>
      </div>

      <div className="cta-container">
        <button className="donar-button">
          Quiero ser parte del cambio
          <span className="button-badge">Impacto directo</span>
        </button>
        <p className="garantia-text">
          <span>✓</span> Transparencia certificada - Recibos digitales - Destino controlado
        </p>
      </div>
    </section>
  );
};

export default Donations;
