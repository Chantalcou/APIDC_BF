import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import ScrollArrow from "../components/ScrollArrow";
import { sendWorkTogether } from "../redux/actions";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import "./SocioConReprocan.css";

const SocioConReprocan = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    email: "",
    phone: "",
    reprocanNumber: "",
    recommendationNumber: "",
    message: "",
    memberType: "No especificado",
  });

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

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const reprocanRegex = /^[0-9]{10}$/;

    switch (name) {
      case "fullName":
        if (!value || !nameRegex.test(value)) {
          newErrors.fullName = "Ingrese un nombre válido";
        } else {
          delete newErrors.fullName;
        }
        break;
      case "lastName":
        if (!value || !nameRegex.test(value)) {
          newErrors.lastName = "Ingrese un apellido válido";
        } else {
          delete newErrors.lastName;
        }
        break;
      case "email":
        if (!value || !emailRegex.test(value)) {
          newErrors.email = "Ingrese un email válido";
        } else {
          delete newErrors.email;
        }
        break;
      case "phone":
        if (!value || !phoneRegex.test(value)) {
          newErrors.phone = "Teléfono debe tener 10 dígitos";
        } else {
          delete newErrors.phone;
        }
        break;
      case "reprocanNumber":
        if (value && !reprocanRegex.test(value)) {
          newErrors.reprocanNumber = "Número de certificado inválido";
        } else {
          delete newErrors.reprocanNumber;
        }
        break;
      case "message":
        if (!value) {
          newErrors.message = "El mensaje no puede estar vacío";
        } else if (value.length > 500) {
          newErrors.message = "Máximo 500 caracteres";
        } else {
          delete newErrors.message;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar todos los campos antes de enviar
    Object.keys(formData).forEach(field => {
      validateField(field, formData[field]);
    });

    if (Object.keys(errors).length > 0) {
      Swal.fire({
        title: "Error",
        text: "Por favor complete todos los campos requeridos",
        icon: "error"
      });
      return;
    }

    setLoading(true);

    try {
      await dispatch(sendWorkTogether({
        ...formData,
        userId: user?.id || null,
        userEmail: user?.email || null
      }));

      Swal.fire({
        title: "¡Enviado!",
        text: "Tu solicitud ha sido recibida",
        icon: "success"
      });

      // Resetear formulario
      setFormData({
        fullName: "",
        lastName: "",
        email: "",
        phone: "",
        reprocanNumber: "",
        recommendationNumber: "",
        message: "",
        memberType: "No especificado"
      });

    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al enviar el formulario",
        icon: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Asociación Civil Cannabis Terapéutico - Roles y Beneficios</title>
        <meta
          name="description"
          content="Únete a la Asociación Civil para el Cannabis Terapéutico y elige el rol que más te convenga"
        />
        <meta
          name="keywords"
          content="socios cannabis, cannabis terapéutico, sociedad cannabis"
        />
        <meta
          property="og:title"
          content="Asociación Civil Cannabis Terapéutico - Roles y Beneficios"
        />
        <meta
          property="og:description"
          content="Descubre los roles en la Asociación Civil para el Cannabis Terapéutico"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dqgjcfosx/image/upload/v1725976604/APIDC-LOGO-01-121x121_qnzw4d.png"
        />
        <meta property="og:url" content="https://apidc.ong/" />
        <meta name="robots" content="index, follow" />
        <link
          rel="icon"
          href="https://res.cloudinary.com/dqgjcfosx/image/upload/v1725976604/APIDC-LOGO-01-121x121_qnzw4d.png"
        />
      </Helmet>

      <div>
        <div className="container-video_gestor my-1">
          <div className="bg-banner_gestor text-center position-relative">
            <img
              src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1742914308/pexels-kindelmedia-7667838_xhpm1z.jpg"
              alt="Imagen de fondo"
              className="bg-image_gestor position-absolute w-100 h-100"
              style={{ objectFit: "cover", top: 0, left: 0 }}
            />
            <div
              id="asociarme-seccion"
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ zIndex: 99 }}
            >
              <h1 className="banner-title">Socio con Reprocan</h1>
              <p className="sub-title_banner text-center mb-5">
                Convertite en un pilar clave de nuestra misión por un futuro más saludable.
              </p>
            </div>
          </div>
        </div>

        <div id="formulario-asociacion" className="formulario-gestor my-5 container formulario-container">
          <h2 className="gestor-title_formulario">Formulario de Asociación</h2>
          
          <form className="formulario-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="fullName"
                className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Tu nombre"
              />
              {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                name="lastName"
                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Tu apellido"
              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                name="phone"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                value={formData.phone}
                onChange={handleChange}
                placeholder="Teléfono"
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

           
            <div className="form-group">
              <label className="form-label">Tipo de Socio</label>
              <select
                name="memberType"
                className={`form-control ${errors.memberType ? "is-invalid" : ""}`}
                value={formData.memberType}
                onChange={handleChange}
              >
                <option value="No especificado">Seleccione una opción</option>
                <option value="Gestor">Gestor</option>
                <option value="Socio con Reprocan">Socio con Reprocan</option>
                <option value="Socio sin Reprocan">Socio sin Reprocan</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Mensaje</label>
              <textarea
                name="message"
                className={`form-control ${errors.message ? "is-invalid" : ""}`}
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Tu mensaje..."
              ></textarea>
              {errors.message && <div className="invalid-feedback">{errors.message}</div>}
            </div>

            <div className="text-center mt-4">
              <Button
                className="gestor-button_submit"
                text={loading ? "Enviando..." : "Enviar Solicitud"}
                type="submit"
                disabled={loading}
                color={{
                  background: "transparent",
                  text: "black",
                  border: "2px solid black",
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SocioConReprocan;