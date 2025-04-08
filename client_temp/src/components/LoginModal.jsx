import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth0 } from "@auth0/auth0-react";
import "./LoginModal.css";

const LoginModal = ({ show, handleClose }) => {
  const { loginWithRedirect } = useAuth0();
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleLogin = () => {
    if (!captchaVerified) {
      alert("Por favor, verifica el CAPTCHA.");
      return;
    }
    loginWithRedirect();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="btn-captcha">Iniciar Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Por favor, verifica el CAPTCHA para continuar.</p>
        <div className="captcha-container">
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleLogin}
          disabled={!captchaVerified}
        >
          Iniciar Sesión
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
