import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./Button";
import Swal from "sweetalert2";
import { FaRegCheckCircle } from "react-icons/fa";
import { sendWorkTogether } from "../redux/actions/index";
import "./ContactForm.css";

const ContactForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const userFromRedux = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
    areaOfInterest: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          newErrors.fullName = "Por favor escriba su nombre.";
        } else {
          delete newErrors.fullName;
        }
        break;
      case "email":
        if (!emailRegex.test(value)) {
          newErrors.email = "Por favor, escribí un email válido.";
        } else {
          delete newErrors.email;
        }
        break;
      case "message":
        if (!value.trim()) {
          newErrors.message = "El mensaje no puede estar vacío.";
        } else {
          delete newErrors.message;
        }
        break;
      case "areaOfInterest":
        if (!value) {
          newErrors.areaOfInterest =
            "Por favor, selecciona un área de interés.";
        } else {
          delete newErrors.areaOfInterest;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validación final antes de enviar
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
    });

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    // Verifica si el usuario está logueado
    if (!userFromRedux || !userFromRedux.email) {
      Swal.fire({
        title: "Acceso requerido",
        text: "Debes iniciar sesión para enviar el formulario",
        icon: "warning",
        confirmButtonText: "Ir a login",
      }).then(() => {
        navigate("/login");
      });
      setIsSubmitting(false);
      return;
    }
    dispatch(
      sendWorkTogether({
        ...formData,
        userEmail: userFromRedux.email, // Agregamos el email del usuario logueado
      })
    )
      .then(() => {
        Swal.fire("¡Gracias!", "Tu mensaje se envió correctamente.", "success");
        setFormData({
          fullName: "",
          email: "",
          message: "",
          areaOfInterest: "",
        });
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error("Error al enviar:", error);
        Swal.fire(
          "Error",
          "No se pudo enviar el mensaje. Por favor intenta nuevamente.",
          "error"
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="full-height">
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-center mb-4">Formulario de Contacto</h2>

            {isSubmitted ? (
              <Alert variant="success" className="text-center">
                <FaRegCheckCircle size={15} /> ¡Gracias por tu mensaje! En breve nos pondremos en contacto.

              </Alert>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    isInvalid={!!errors.fullName}
                    placeholder="Tu nombre completo"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="tu@email.com"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    isInvalid={!!errors.message}
                    rows={4}
                    placeholder="Escribe tu mensaje..."
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <ButtonComponent
                    text={isSubmitting ? "Enviando..." : "Enviar"}
                    color={{
                      background: "transparent",
                      text: "black",
                      border: "2px solid black",
                    }}
                    disabled={isSubmitting}
                  />
                </div>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactForm;
