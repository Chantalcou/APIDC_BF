import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { useSelector } from "react-redux";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./Button";
import Swal from "sweetalert2";

import { FaRegCheckCircle } from "react-icons/fa";
import "./ContactForm.css";

const ContactForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const userFromRedux = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    from_name: "",
    to_name: "", //  (en este caso el destinatario)
    message: "",
  });

  const [status, setStatus] = useState("");
  const [statusVariant, setStatusVariant] = useState("success");
  const [errors, setErrors] = useState(false); // Estado para manejar los errores

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos
    if (!formData.from_name || !formData.to_name || !formData.message) {
      setErrors(true); // Mostrar mensaje de error si hay campos vacíos
      setStatus("Por favor, completa todos los campos.");
      setStatusVariant("danger");
      return;
    }

    // Si está logueado, continúa con el envío del mensaje
    setStatus("Enviando...");
    setStatusVariant("info");

    // Verifica si el usuario está logueado
    if (!userFromRedux || !userFromRedux.email) {
      setStatus("No estás logueado. Por favor, inicia sesión.");
      setStatusVariant("danger");

      // Redirige al usuario a la página de login
      navigate("/login");
      return;
    }

    const emailRecipient = userFromRedux.email || "chantiicou@gmail.com"; // Correo por defecto
    setFormData((prevState) => ({ ...prevState, to_name: emailRecipient })); // Asigna el destinatario

    // Envío del formulario a EmailJS
    emailjs
      .sendForm(
        "service_n7iprht", // ID del servicio
        "template_rqqmprl", // ID de la plantilla
        e.target, // Formulario que estás enviando
        "CfDbaVqLjMAHH6wYo" // Public Key
      )
      .then(
        (result) => {
          setStatus("Mensaje enviado correctamente");
          setStatusVariant("success");
          setFormData({ from_name: "", to_name: "", message: "" });
          setErrors(false); // Limpiar errores si el envío fue exitoso
          Swal.fire("Gracias por comunicarte con nosotros. A la brevedad nos pondremos en contacto.");
        },
        (error) => {
          console.log(error);
          setStatus("Hubo un error al enviar el mensaje");
          setStatusVariant("danger");
        }
      );
  };

  return (
    <div className="full-height">
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-center mb-4">Formulario de Contacto</h2>

            {status && (
              <Alert variant={statusVariant} className="text-center">
                   <FaRegCheckCircle size={15}/> {status}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="from_name" // Cambiado para que coincida con la plantilla
                  value={formData.from_name}
                  onChange={handleChange}
                  required
                  placeholder="Nombre"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="to_name" // Cambiado para que coincida con la plantilla
                  value={formData.to_name}
                  onChange={handleChange}
                  required
                  placeholder="Correo electrónico"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message" // Cambiado para que coincida con la plantilla
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Mensaje"
                />
              </Form.Group>

              {errors && (
                <Alert variant="danger" className="text-center">
                  Por favor, completa todos los campos.
                </Alert>
              )}

              <div className="d-grid">
                <ButtonComponent
                  text="Enviar"
                  color={{
                    background: "transparent",
                    text: "black",
                    border: "2px solid black",
                  }}
                />
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactForm;
