import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import $ from "jquery";
import { useDispatch } from "react-redux";
import ScrollArrow from "../components/ScrollArrow";
import { formInfo } from "../redux/actions";
import { Helmet } from "react-helmet-async"; //Optimizacion SEO
import "./Gestor.css";

const SocioConReprocan = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [errors, setErrors] = useState({});
  const [successPopup, setSuccessPopup] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (sectionId) => {
    $("html, body").animate(
      {
        scrollTop: $("#" + sectionId).offset().top,
      },
      1000
    );
  };

  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    email: "",
    phone: "",
    reprocanNumber: "",
    recommendationNumber: "",
    message: "",
    memberType: "No especificado", // Valor inicial predeterminado
    // birthDate: "",
    // termsAccepted: false,
    // certReprocan: null,
  });

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const reprocanRegex = /^[0-9]{10}$/;

    switch (name) {
      case "fullName":
        if (!value || !nameRegex.test(value)) {
          newErrors.fullName = "Por favor, ingresa un nombre válido.";
        } else {
          delete newErrors.fullName;
        }
        break;
      case "lastName":
        if (!value || !nameRegex.test(value)) {
          newErrors.lastName = "Por favor, ingresa un apellido válido.";
        } else {
          delete newErrors.lastName;
        }
        break;
      case "email":
        if (!value || !emailRegex.test(value)) {
          newErrors.email = "Por favor, ingresa un correo electrónico válido.";
        } else {
          delete newErrors.email;
        }
        break;
      case "phone":
        if (!value || !phoneRegex.test(value)) {
          newErrors.phone = "El teléfono debe tener 10 dígitos.";
        } else {
          delete newErrors.phone;
        }
        break;
      case "reprocanNumber":
        if (!value || !reprocanRegex.test(value)) {
          newErrors.reprocanNumber =
            "El número de certificado Reprocan debe tener 10 dígitos.";
        } else {
          delete newErrors.reprocanNumber;
        }
        break;
      case "message":
        if (!value) {
          newErrors.message = "El mensaje no puede estar vacío.";
        } else if (value.length > 500) {
          // Ejemplo: límite de 500 caracteres
          newErrors.message = "El mensaje no puede superar los 500 caracteres.";
        } else {
          delete newErrors.message;
        }
        break;
      case "memberType":
        if (!value) {
          newErrors.memberType = "Por favor, selecciona un tipo de socio.";
        } else {
          delete newErrors.memberType;
        }
        break;
      // case "birthDate":
      //   if (!value) {
      //     newErrors.birthDate = "La fecha de nacimiento es obligatoria.";
      //   } else {
      //     delete newErrors.birthDate;
      //   }
      //   break;
      // case "termsAccepted":
      //   if (!value) {
      //     newErrors.termsAccepted = "Debes aceptar los términos y condiciones.";
      //   } else {
      //     delete newErrors.termsAccepted;
      //   }
      //   break;
      // case "certReprocan":
      //   if (!value) {
      //     newErrors.certReprocan = "Debes adjuntar la certificación Reprocan.";
      //   } else {
      //     delete newErrors.certReprocan;
      //   }
      //   break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
      validateField(name, files[0]);
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
      validateField(name, checked);
    } else {
      setFormData({ ...formData, [name]: value }); // Sin trim()
      validateField(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSubmitError(null);

    const validationErrors = { ...errors };
    if (Object.keys(validationErrors).length === 0) {
      try {
        await dispatch(formInfo(formData)); // Espera la respuesta de la acción
        setFormData({
          fullName: "",
          lastName: "",
          email: "",
          phone: "",
          reprocanNumber: "",
          recommendationNumber: "",
          message: "",
        }); // Vacía el formulario
        setSuccessPopup(true); // Muestra el popup
        setLoading(false);
      } catch (error) {
        setSubmitError("Hubo un error al enviar los datos.");
        setLoading(false);
      }
    } else {
      console.log("Hay errores en el formulario");
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Socio con Reprocan - Asociación Civil Cannabis Terapéutico
        </title>

        <meta
          name="description"
          content="Conviértete en socio con Reprocan de nuestra Asociación Civil para el Cannabis Terapéutico. Modifica tu domicilio para el cultivo de cannabis y accede a los beneficios del cannabis terapéutico como tratamiento natural."
        />

        <meta
          name="keywords"
          content="socio con reprocan, cultivo cannabis, cannabis terapéutico, tratamiento natural, salud con cannabis, cultivo en campo, bienestar cannabis, asociación civil cannabis"
        />

        <meta
          property="og:title"
          content="Socio con Reprocan - Asociación Civil Cannabis Terapéutico"
        />

        <meta
          property="og:description"
          content="Como socio con Reprocan, puedes cambiar tu domicilio al campo para el cultivo de cannabis terapéutico. Accede a un tratamiento natural y beneficioso para tu salud."
        />

        <meta
          property="og:image"
          content="https://res.cloudinary.com/dqgjcfosx/image/upload/v1725976604/APIDC-LOGO-01-121x121_qnzw4d.png"
        />

        <meta
          property="og:url"
          content="https://tu-dominio.com/socio-con-reprocan"
        />

        <meta name="robots" content="index, follow" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link
          rel="icon"
          href="https://res.cloudinary.com/dqgjcfosx/image/upload/v1725976604/APIDC-LOGO-01-121x121_qnzw4d.png"
        />

        {/* Twitter card para optimizar la vista previa en Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Socio con Reprocan - Asociación Civil Cannabis Terapéutico"
        />
        <meta
          name="twitter:description"
          content="Modifica tu domicilio al campo para el cultivo de cannabis terapéutico y accede a sus beneficios como tratamiento natural. Únete a nuestra comunidad dedicada al bienestar con cannabis."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dqgjcfosx/image/upload/v1725976604/APIDC-LOGO-01-121x121_qnzw4d.png"
        />
      </Helmet>

      <div>
        <div className="container-video_gestor my-1">
          <div className="bg-banner_gestor text-center position-relative">
            <video
              autoPlay
              muted
              loop
              className="bg-video_gestor position-absolute w-100 h-100"
              style={{ objectFit: "cover", top: 0, left: 0 }}
            >
              <source
                src="https://res.cloudinary.com/dqgjcfosx/video/upload/v1735911484/7667161-uhd_3840_2160_30fps_ry111a.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div
              id="asociarme-seccion"
              className="d-flex flex-column justify-content-center align-items-center h-100"
              style={{ zIndex: 99 }}
            >
              <h1 className="banner-title">Socio con Reprocan</h1>
              <p className="sub-title_banner text-center mb-5">
                Da el primer paso hacia un futuro lleno de oportunidades en la
                industria del cannabis medicinal. Como Socio sin Reprocan,
                formarás parte de una red colaborativa y visionaria, obteniendo
                apoyo para maximizar tu impacto y conocimiento en este sector.
                Estamos aquí para ayudarte a crecer, aprender y explorar nuevas
                posibilidades. Únete y juntos construyamos un camino hacia un
                futuro prometedor.
              </p>

              <div className="gestor-scroll_arrow static-content d-flex flex-column justify-content-center align-items-center  position-relative">
                <ScrollArrow
                  onClick={() => scrollToSection("formulario-asociacion")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {[
            "Gana un Porcentaje de las Ventas",
            "Expande tu Red de Contactos",
            "Asesoría y Soporte Continuo",
          ].map((benefit, index) => (
            <div className="col-md-4" key={index}>
              <div className="benefit-card">
                <h3 className="benefit-title">{benefit}</h3>
                <p>
                  {index === 0
                    ? "Como gestor, podrás generar ingresos adicionales vendiendo productos de nuestra red, y recibirás un porcentaje por cada venta realizada, lo que te brinda una fuente de ingresos constante."
                    : index === 1
                    ? "Ser parte de nuestra red de gestores te permitirá conectarte con otros profesionales del sector, expandiendo tu red de contactos y aumentando las oportunidades de negocio."
                    : "Nuestro equipo te brindará todo el apoyo necesario para garantizar el éxito de tu negocio, con asesoría constante en ventas, marketing y estrategias comerciales para maximizar tus ganancias."}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          id="formulario-asociacion"
          className="formulario-gestor my-5 container formulario-container "
        >
          <h2 className="gestor-title_formulario">Formulario de Asociación</h2>
          <form className="formulario-form" onSubmit={handleSubmit}>
            <div>
              <label className="form-label" htmlFor="fullName">
                Nombre Completo
              </label>
              <input
                placeholder="Ingresa tu nombre completo"
                type="text"
                id="fullName"
                name="fullName"
                className={`form-control ${
                  errors.fullName ? "is-invalid" : ""
                }`}
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <div className="invalid-feedback">{errors.fullName}</div>
              )}
            </div>
            <div>
              <label className="form-label" htmlFor="lastName">
                Apellido
              </label>
              <input
                placeholder="Ingresa apellido"
                type="text"
                id="lastName"
                name="lastName"
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <div className="invalid-feedback">{errors.fullName}</div>
              )}
            </div>
            <div>
              <label className="form-label" htmlFor="email">
                Correo Electrónico
              </label>
              <input
                placeholder="Ingresa tu correo electrónico"
                type="email"
                id="email"
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div>
              <label className="form-label" htmlFor="phone">
                Teléfono
              </label>
              <input
                placeholder="Ingresa tu celular"
                type="text"
                id="phone"
                name="phone"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </div>
            <div>
              <label className="form-label" htmlFor="reprocanNumber">
                Número de Certificado Reprocan
              </label>
              <input
                placeholder="Ingresa tu número de Reprocan"
                type="text"
                id="reprocanNumber"
                name="reprocanNumber"
                className={`form-control ${
                  errors.reprocanNumber ? "is-invalid" : ""
                }`}
                value={formData.reprocanNumber}
                onChange={handleChange}
              />
              {errors.reprocanNumber && (
                <div className="invalid-feedback">{errors.reprocanNumber}</div>
              )}
            </div>
            <div>
              <label className="form-label" htmlFor="message">
                Mensaje
              </label>
              <textarea
                placeholder="Escribe tu mensaje aquí..."
                id="message"
                name="message"
                rows="4" // Define el número de líneas visibles
                className={`form-control ${errors.message ? "is-invalid" : ""}`}
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && (
                <div className="invalid-feedback">{errors.message}</div>
              )}
            </div>
            <div>
              <label className="form-label" htmlFor="memberType">
                Tipo de Socio
              </label>
              <select
                id="memberType"
                name="memberType"
                className={`form-control ${
                  errors.memberType ? "is-invalid" : ""
                }`}
                value={formData.memberType}
                onChange={handleChange}
              >
                <option value="No especificado">No especificado</option>
                <option value="Gestor">Gestor</option>
                <option value="Socio con Reprocan">Socio con Reprocan</option>
                <option value="Socio sin Reprocan">Socio sin Reprocan</option>
              </select>
              {errors.memberType && (
                <div className="invalid-feedback">{errors.memberType}</div>
              )}
            </div>

            {/* <div>
            <label className="form-label" htmlFor="birthDate">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              className={`form-control ${errors.birthDate ? "is-invalid" : ""}`}
              value={formData.birthDate}
              onChange={handleChange}
            />
            {errors.birthDate && (
              <div className="invalid-feedback">{errors.birthDate}</div>
            )}
          </div> */}
            {/* <div className="form-check">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              className="form-check-input"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="termsAccepted">
              Acepto los <a href="#">términos y condiciones</a>
            </label>
            {errors.termsAccepted && (
              <div className="invalid-feedback">{errors.termsAccepted}</div>
            )}
          </div> */}
            {/* <div>
            <label className="form-label" htmlFor="certReprocan">
              Adjuntar Certificación Reprocan
            </label>
            <input
              type="file"
              id="certReprocan"
              name="certReprocan"
              className="form-control"
              onChange={handleChange}
            />
            {errors.certReprocan && (
              <div className="invalid-feedback">{errors.certReprocan}</div>
            )}
          </div> */}

            {successPopup && (
              <div className="popup">
                <div className="popup-content">
                  <h2>Formulario enviado correctamente</h2>
                  <p>
                    Gracias por completar el formulario. Nos pondremos en
                    contacto contigo pronto.
                  </p>
                  <button onClick={() => setSuccessPopup(false)}>Cerrar</button>
                </div>
              </div>
            )}

            {submitError && (
              <div className="alert alert-danger">{submitError}</div>
            )}
          </form>
        </div>
        <div className="text-center">
          <Button
            className="gestor-button_submit"
            text={loading ? "Enviando..." : "Enviar Solicitud"}
            onClick={
              handleSubmit
            } /* Cambiado para que la función se ejecute correctamente */
            color={{
              background: "transparent",
              text: "black",
              type: "submit",
              border: "black!important",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SocioConReprocan;
