import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import "./LoginModal.css";

const LoginModal = ({ show, handleClose }) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Ocurrió un error al iniciar sesión.");
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="btn-captcha">Iniciar sesión</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Ingresá para acceder al espacio de socios.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleLogin}>
          Ingresar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;