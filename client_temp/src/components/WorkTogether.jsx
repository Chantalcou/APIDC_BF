import React, { useState } from "react";
import { send } from "emailjs-com";
import { sendWorkTogether } from "../redux/actions/index";
import ButtonComponent from "./Button";
import { useDispatch } from "react-redux";
import "./WorkTogether.css";

export const WorkTogether = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
    areaOfInterest: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          newErrors.fullName = "Por favor, escribinos tu nombre.";
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
          newErrors.message = "No te olvides de escribir un mensaje.";
        } else {
          delete newErrors.message;
        }
        break;
      case "areaOfInterest":
        if (!value) {
          newErrors.areaOfInterest =
            "Elegí un área de interés, por favor.";
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
    if (name === "areaOfInterest") {
      validateField(name, value); // Si necesitas validación adicional
    } else {
      validateField(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si hay errores
    const hasErrors = Object.keys(errors).length > 0;
    if (!hasErrors) {
      dispatch(sendWorkTogether(formData));
      setIsSubmitted(true);
    }
  };

  return (
    <div id="work-together" className="work-together">
      <video className="background-video" autoPlay muted loop>
        <source
          src="https://res.cloudinary.com/dqgjcfosx/video/upload/v1737463914/8243034-uhd_2160_3840_24fps_bsifnn.mp4"
          type="video/mp4"
        />
Tu navegador no admite videos HTML5
      </video>
      <div className="content-work_together">
        <h2 className="work-together-title">¡Trabajemos juntos!</h2>
        {isSubmitted ? (
          <div className="success-message">
          ¡Gracias por escribirnos!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="work-together-form">
            <div className="form-group">
              <label htmlFor="fullName">Nombre completo</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? "error" : ""}
              />
              {errors.fullName && (
                <span className="error-message">{errors.fullName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? "error" : ""}
              />
              {errors.message && (
                <span className="error-message">{errors.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="areaOfInterest">Área de interés</label>
              <select
                id="areaOfInterest"
                name="areaOfInterest"
                value={formData.areaOfInterest}
                onChange={handleChange}
                className={errors.areaOfInterest ? "error" : ""}
              >
                <option value="">Elegí una opción</option>
                <option value="medicos">Médicos</option>
                <option value="ingenierosAgronomos">
                  Ingenieros Agrónomos
                </option>
                <option value="administracion">Administración</option>
                <option value="tecnicosCultivo">Técnicos en Cultivo</option>
                <option value="ayudantesCultivo">Ayudantes de Cultivo</option>
              </select>
              {errors.areaOfInterest && (
                <span className="error-message">{errors.areaOfInterest}</span>
              )}
            </div>

            <ButtonComponent
              text="Enviar mensaje"
              color={{
                background: "transparent",
                text: "#ffffff",
                border: "2px solid white",
              }}
              // Aquí llamamos a la función handleSubmit
            />
          </form>
        )}
      </div>
    </div>
  );
};
