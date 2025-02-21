import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./Button";
import "./NewsLetterBanner.css";
import { FaRegCheckCircle } from "react-icons/fa";

export default function NewsletterBanner() {
  const userFromRedux = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    from_email: "",
  });

  const [status, setStatus] = useState("");
  const [statusVariant, setStatusVariant] = useState("success");
  const [errors, setErrors] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.from_email.trim()) {
      setErrors(true);
      setStatus("Por favor, completa el campo de email.");
      setStatusVariant("danger");
      return;
    }

    setStatus("Enviando...");
    setStatusVariant("info");

    if (!userFromRedux || !userFromRedux.email) {
      setStatus("No estás logueado. Por favor, inicia sesión.");
      setStatusVariant("danger");
      navigate("/login");
      return;
    }

    const emailRecipient = userFromRedux.email || "chantiicou@gmail.com";

    emailjs
      .send(
        "service_n7iprht",
        "template_rqqmprl",
        {
          from_email: formData.from_email,
          to_name: emailRecipient,
          message: `Email enviado para suscripción al newsletter: ${formData.from_email}`,
        },
        "CfDbaVqLjMAHH6wYo"
      )
      .then(
        () => {
          setStatus(
            "¡Gracias por suscribirte! A partir de ahora vas a recibir nuestras novedades en tu email."
          );
          setStatusVariant("success");
          setFormData({ from_email: "" });
          setErrors(false);
          // Swal.fire("¡Gracias por suscribirte! A partir de ahora vas a recibir nuestras novedades en tu email.");
        },
        () => {
          setStatus("Hubo un error al enviar el mensaje");
          setStatusVariant("danger");
        }
      );
  };

  return (
    <div className="newsletter-container_banner">
      <h2 className="newsletter-title">NEWSLETTER:</h2>
      <p className="newsletter-text">Regístrate y recibe nuestras ofertas.</p>

      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          name="from_email"
          value={formData.from_email}
          onChange={handleChange}
          required
          placeholder="Tu correo electrónico"
          className="newsletter-input"
        />
        <ButtonComponent
          text="Enviar"
          color={{
            background: "transparent",
            text: "black",
            border: "2px solid black",
          }}
        />
      </form>

      {/* Mensajes de estado (centrados debajo del formulario) */}
      {status && (
        <>
          
          <Alert variant={statusVariant} className="status-message">
          <FaRegCheckCircle size={15}/> {status}
          </Alert>
        </>
      )}

      {errors && (
        <Alert variant="danger" className="status-message">
          Por favor, completa el campo de email.
        </Alert>
      )}
    </div>
  );
}
