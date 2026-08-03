import React, { useState } from "react";
import { send } from "emailjs-com";
import { useDispatch } from "react-redux";
import {
  FaBriefcase,
  FaCheckCircle,
  FaCommentDots,
  FaEnvelope,
  FaExclamationTriangle,
  FaPaperPlane,
  FaUser,
} from "react-icons/fa";

import { sendWorkTogether } from "../redux/actions/index";
import "./WorkTogether.css";

const INITIAL_FORM_DATA = {
  fullName: "",
  email: "",
  area: "",
  message: "",
};

const INTEREST_OPTIONS = [
  {
    value: "investigacion",
    label: "Investigación y desarrollo",
  },
  {
    value: "convenios",
    label: "Convenios institucionales",
  },
  {
    value: "alianzas",
    label: "Alianzas estratégicas",
  },
  {
    value: "servicios",
    label: "Servicios profesionales",
  },
  {
    value: "voluntariado",
    label: "Voluntariado",
  },
  {
    value: "otro",
    label: "Otro motivo",
  },
];

const WorkTogether = ({
  backgroundImage = "/images/bandera-argentina.jpg",
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(
    INITIAL_FORM_DATA
  );

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] =
    useState("idle");
  const [submitMessage, setSubmitMessage] =
    useState("");

  const sectionStyle = {
    "--wwu-background-image": `url("${backgroundImage}")`,
  };

  const validateForm = () => {
    const newErrors = {};

    const cleanName = formData.fullName.trim();
    const cleanEmail = formData.email.trim();
    const cleanMessage = formData.message.trim();

    if (!cleanName) {
      newErrors.fullName =
        "Ingresá tu nombre completo.";
    } else if (cleanName.length < 3) {
      newErrors.fullName =
        "El nombre debe tener al menos 3 caracteres.";
    }

    if (!cleanEmail) {
      newErrors.email =
        "Ingresá tu correo electrónico.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        cleanEmail
      )
    ) {
      newErrors.email =
        "Ingresá un correo electrónico válido.";
    }

    if (!formData.area) {
      newErrors.area =
        "Seleccioná un área de interés.";
    }

    if (!cleanMessage) {
      newErrors.message =
        "Escribí brevemente tu consulta.";
    } else if (cleanMessage.length < 10) {
      newErrors.message =
        "El mensaje debe tener al menos 10 caracteres.";
    }

    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previousErrors) => {
        const updatedErrors = {
          ...previousErrors,
        };

        delete updatedErrors[name];

        return updatedErrors;
      });
    }

    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setSubmitMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);
      setSubmitStatus("error");
      setSubmitMessage(
        "Revisá los campos señalados antes de enviar."
      );
      return;
    }

    const cleanFormData = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      area: formData.area,
      message: formData.message.trim(),
    };

    setErrors({});
    setSubmitStatus("sending");
    setSubmitMessage("");

    try {
      const serviceId =
        process.env
          .REACT_APP_EMAILJS_SERVICE_ID;

      const templateId =
        process.env
          .REACT_APP_EMAILJS_TEMPLATE_ID;

      const publicKey =
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

      if (
        serviceId &&
        templateId &&
        publicKey
      ) {
        await send(
          serviceId,
          templateId,
          {
            from_name: cleanFormData.fullName,
            reply_to: cleanFormData.email,
            email: cleanFormData.email,
            area: cleanFormData.area,
            message: cleanFormData.message,
          },
          publicKey
        );
      }

      const dispatchResult = dispatch(
        sendWorkTogether(cleanFormData)
      );

      if (
        dispatchResult &&
        typeof dispatchResult.then ===
          "function"
      ) {
        await dispatchResult;
      }

      setSubmitStatus("success");

      setSubmitMessage(
        "¡Gracias por contactarnos! Recibimos tu mensaje y nos comunicaremos a la brevedad."
      );

      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      console.error(
        "Error al enviar el formulario:",
        error
      );

      setSubmitStatus("error");

      setSubmitMessage(
        "No pudimos enviar tu mensaje en este momento. Por favor, intentá nuevamente."
      );
    }
  };

  const getControlClassName = (
    fieldName
  ) => {
    return errors[fieldName]
      ? "wwu-form__control wwu-form__control--error"
      : "wwu-form__control";
  };

  return (
    <section
      className="wwu-section"
      id="trabajemos-juntos"
      aria-labelledby="wwu-title"
      style={sectionStyle}
    >
      <div
        className="wwu-section__background"
        aria-hidden="true"
      />

      <div
        className="wwu-section__overlay"
        aria-hidden="true"
      />

      <div
        className="wwu-section__glow"
        aria-hidden="true"
      />

      <div className="wwu-section__container">
        <div className="wwu-card">
          <header className="wwu-card__header">
            <span className="wwu-card__eyebrow">
              Contacto institucional
            </span>

            <h2
              className="wwu-card__title"
              id="wwu-title"
            >
              Trabajemos juntos
            </h2>

            <p className="wwu-card__description">
              Completá el formulario para contarnos
              tu propuesta, consulta o interés en
              colaborar con nuestra organización.
            </p>
          </header>

          <form
            className="wwu-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="wwu-form__grid">
              <div className="wwu-form__field">
                <label
                  className="wwu-form__label"
                  htmlFor="wwu-fullName"
                >
                  Nombre completo
                  <span
                    className="wwu-form__required"
                    aria-hidden="true"
                  >
                    *
                  </span>
                </label>

                <div className="wwu-form__control-wrapper">
                  <FaUser
                    className="wwu-form__field-icon"
                    aria-hidden="true"
                  />

                  <input
                    id="wwu-fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={getControlClassName(
                      "fullName"
                    )}
                    placeholder="Ej.: María González"
                    autoComplete="name"
                    maxLength={80}
                    aria-invalid={Boolean(
                      errors.fullName
                    )}
                    aria-describedby={
                      errors.fullName
                        ? "wwu-fullName-error"
                        : undefined
                    }
                  />
                </div>

                {errors.fullName && (
                  <span
                    className="wwu-form__error"
                    id="wwu-fullName-error"
                    role="alert"
                  >
                    <FaExclamationTriangle
                      aria-hidden="true"
                    />

                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className="wwu-form__field">
                <label
                  className="wwu-form__label"
                  htmlFor="wwu-email"
                >
                  Correo electrónico
                  <span
                    className="wwu-form__required"
                    aria-hidden="true"
                  >
                    *
                  </span>
                </label>

                <div className="wwu-form__control-wrapper">
                  <FaEnvelope
                    className="wwu-form__field-icon"
                    aria-hidden="true"
                  />

                  <input
                    id="wwu-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={getControlClassName(
                      "email"
                    )}
                    placeholder="nombre@correo.com"
                    autoComplete="email"
                    maxLength={120}
                    aria-invalid={Boolean(
                      errors.email
                    )}
                    aria-describedby={
                      errors.email
                        ? "wwu-email-error"
                        : undefined
                    }
                  />
                </div>

                {errors.email && (
                  <span
                    className="wwu-form__error"
                    id="wwu-email-error"
                    role="alert"
                  >
                    <FaExclamationTriangle
                      aria-hidden="true"
                    />

                    {errors.email}
                  </span>
                )}
              </div>

              <div className="wwu-form__field wwu-form__field--full">
                <label
                  className="wwu-form__label"
                  htmlFor="wwu-area"
                >
                  Área de interés
                  <span
                    className="wwu-form__required"
                    aria-hidden="true"
                  >
                    *
                  </span>
                </label>

                <div className="wwu-form__control-wrapper">
                  <FaBriefcase
                    className="wwu-form__field-icon"
                    aria-hidden="true"
                  />

                  <select
                    id="wwu-area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className={`${getControlClassName(
                      "area"
                    )} wwu-form__select`}
                    aria-invalid={Boolean(
                      errors.area
                    )}
                    aria-describedby={
                      errors.area
                        ? "wwu-area-error"
                        : undefined
                    }
                  >
                    <option
                      value=""
                      disabled
                    >
                      Seleccioná una opción
                    </option>

                    {INTEREST_OPTIONS.map(
                      (option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      )
                    )}
                  </select>

                  <span
                    className="wwu-form__select-arrow"
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </div>

                {errors.area && (
                  <span
                    className="wwu-form__error"
                    id="wwu-area-error"
                    role="alert"
                  >
                    <FaExclamationTriangle
                      aria-hidden="true"
                    />

                    {errors.area}
                  </span>
                )}
              </div>

              <div className="wwu-form__field wwu-form__field--full">
                <label
                  className="wwu-form__label"
                  htmlFor="wwu-message"
                >
                  Mensaje
                  <span
                    className="wwu-form__required"
                    aria-hidden="true"
                  >
                    *
                  </span>
                </label>

                <div className="wwu-form__control-wrapper wwu-form__control-wrapper--textarea">
                  <FaCommentDots
                    className="wwu-form__field-icon wwu-form__field-icon--textarea"
                    aria-hidden="true"
                  />

                  <textarea
                    id="wwu-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${getControlClassName(
                      "message"
                    )} wwu-form__textarea`}
                    placeholder="Contanos brevemente tu propuesta, consulta o interés..."
                    rows={6}
                    maxLength={1000}
                    aria-invalid={Boolean(
                      errors.message
                    )}
                    aria-describedby={
                      errors.message
                        ? "wwu-message-error"
                        : "wwu-message-help"
                    }
                  />
                </div>

                <div className="wwu-form__field-footer">
                  <span
                    className="wwu-form__helper"
                    id="wwu-message-help"
                  >
                    Máximo 1000 caracteres
                  </span>

                  <span className="wwu-form__counter">
                    {formData.message.length}/1000
                  </span>
                </div>

                {errors.message && (
                  <span
                    className="wwu-form__error"
                    id="wwu-message-error"
                    role="alert"
                  >
                    <FaExclamationTriangle
                      aria-hidden="true"
                    />

                    {errors.message}
                  </span>
                )}
              </div>
            </div>

            <button
              className="wwu-form__submit"
              type="submit"
              disabled={
                submitStatus === "sending"
              }
            >
              {submitStatus === "sending" ? (
                <>
                  <span
                    className="wwu-form__spinner"
                    aria-hidden="true"
                  />

                  Enviando mensaje...
                </>
              ) : (
                <>
                  <FaPaperPlane
                    aria-hidden="true"
                  />

                  Enviar mensaje
                </>
              )}
            </button>

            {submitMessage && (
              <div
                className={`wwu-form__status wwu-form__status--${submitStatus}`}
                role={
                  submitStatus === "error"
                    ? "alert"
                    : "status"
                }
              >
                {submitStatus === "success" ? (
                  <FaCheckCircle
                    aria-hidden="true"
                  />
                ) : (
                  <FaExclamationTriangle
                    aria-hidden="true"
                  />
                )}

                <span>{submitMessage}</span>
              </div>
            )}

            <p className="wwu-form__privacy">
              Los datos ingresados serán utilizados
              únicamente para responder tu consulta.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export { WorkTogether };
export default WorkTogether;