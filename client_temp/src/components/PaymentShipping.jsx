import React from "react";
import { FaMoneyBillWave, FaShippingFast, FaWhatsapp } from "react-icons/fa";
import "./PaymentShipping.css"; // Crear este archivo CSS

const PaymentShipping = () => {
  return (
    <div className="payment-shipping-section">
      <h2 className="section-title">🚚 Métodos de Pago y Envío</h2>

      <div className="info-container">
        {/* Sección de Pagos */}
        <div className="payment-methods">
          <div className="icon-title">
            <FaMoneyBillWave className="method-icon" />
            <h3 className="payment-subtitle">Medios de Pago</h3>
          </div>
          <ul className="method-list">
            <li className="method-item">
              <span className="method-name">Transferencia Bancaria</span>
              <span className="method-detail">(Datos por WhatsApp)</span>
            </li>
          </ul>
          <ul className="method-list">
            <li className="method-item">
              <span className="method-name">Tarjeta de crédito</span>
              <span className="method-detail">(pago mediante link)</span>
            </li>
          </ul>
        </div>

        {/* Sección de Envíos */}
        <div className="shipping-methods">
          <div className="icon-title">
            <FaShippingFast className="method-icon" />
            <h3 className="payment-subtitle">Envíos a Domicilio</h3>
          </div>
          <div className="shipping-details">
            <img
              src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1736345614/andreani_e9flk9.png"
              alt="Andreani"
              className="courier-logo"
            />
            <p className="shipping-info">
              Entregas seguras por Andreani
              <br />
              <span className="highlight">A todo el territorio nacional</span>
              <br />
              <em>
                (El envío lo abonás vos, directamente con la empresa de correo)
              </em>
            </p>
          </div>
        </div>
      </div>

      <div className="process-info">
        <FaWhatsapp className="whatsapp-process-icon" />
        <p>
          <strong>Proceso posterior al pago:</strong>
          <br />
          1. Envíanos el comprobante por WhatsApp
          <br />
          2. Coordinamos el envío inmediatamente
          <br />
          3. Recibís seguimiento del paquete
        </p>
      </div>
    </div>
  );
};

export default PaymentShipping;
