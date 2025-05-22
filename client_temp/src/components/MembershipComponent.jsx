import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import PaymentShipping from "./PaymentShipping";
import ButtonComponent from "./Button";
import "./MembershipComponent.css";

const MembershipComponent = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedRole) {
      handleLogin();
    }
  }, [selectedRole]);

  const handleLogin = async () => {
    if (isAuthenticated) {
      if (selectedRole === "SocioConReprocann") {
        navigate("/membershipSection/SocioConReprocann");
      } else if (selectedRole === "SocioSinReprocann") {
        navigate("/membershipSection/socioSinReprocann");
      } else {
        navigate("/membershipSection/gestor");
      }
    } else {
      await loginWithRedirect({
        redirectUri: window.location.origin + "/",
      });
    }
  };

  const phoneNumber = "1568824488";

  const url = `https://wa.me/${phoneNumber}`;

  return (
    <>
      {/* MEMBERSHIP SECTION */}
      <div className="membership-section">
        <h1 className="section-title_title_membership">
          🌱 Tu Camino con APIDC
        </h1>
        <p className="section-subtitle">
          Elegí el plan que impulse tu bienestar.
        </p>
        {/*  STEEPS*/}
        <p className="section-subtitle">
          Para acceder a nuestros servicios, comenzá como Socio Adherente y
          luego seleccioná la opción que mejor se adapte a tus objetivos: SOCIO
          REPROCANn (cultivo personal REPROCANn) o Gestor (acompañamiento
          experto).
        </p>
        <h2>🚀 Pasos para Unirte</h2>
        <div className="steps-container">
          <div className="step">
            <div className="circle">1</div>
            <p className="step-text">Uníte como Socio Adherente</p>
          </div>
          <div className="arrow">→</div>
          <div className="step">
            <div className="circle">2</div>
            <p className="step-text">Elegí Reprocann o Gestor</p>
          </div>
        </div>{" "}
        {/* Otras Cards (Distribuidas en tres columnas) */}
        <div className="cards-container">
          {/* Socio con Reprocann */}
          <div className="card">
            <h2 className="card-title">Socio adherente</h2>
            <p className="price-container_membership">
              {/* <span className="price-old">17.000</span> */}
            </p>
            <p className="card-subtitle">
              Hacete parte de un movimiento que transforma vidas.
            </p>
            <ul className="benefits-list">
              <li>✔ Participación en Investigación de Cultivo Medicinal</li>
              <li>
                ✔ Programa de Acceso Solidario a Terapias Cannabinoides - Tu
                contribución subvenciona tratamientos medicinales para pacientes
                en situación de vulnerabilidad socioeconómica, garantizando el
                acceso equitativo a terapias esenciales.
              </li>

              <li>✔ Atención Personalizada Online para Gestión del REPROCANn</li>
            </ul>
            <div className="content-buttons_memberShip">
              <ButtonComponent
                className="card-button"
                onClick={() => window.open(url, "_blank")}
                color={{
                  background: "transparent",
                  text: "#0a9d6d", 
                  border: "2px solid white",
                  fontSize: ".8rem",
                }}
                text="WhatsApp"
              />

            <ButtonComponent
  className="card-button"
  onClick={() =>
    window.open("https://form.jotform.com/apidcasociacion/formulario-registro-APIDC-REPROCANN", "_blank")
  }
  color={{
    background: "transparent",
    text: "#ffff", 
    border: "2px solid white",
    fontSize: ".8rem",
  }}
  text="Completar Solicitud"
/>

            </div>
          </div>
          <div className="card">
            <h2 className="card-title">Socio con Reprocann</h2>
            <p className="price-container_membership"></p>
            <p className="card-subtitle">
              Realizá tus cultivos en nuestras instalaciones y delegá su cuidado
              a nuestro equipo. Ofrecemos un servicio personalizado con costos
              específicos según tu preferencia.
            </p>
            <ul className="benefits-list">
              <li>✔ Un Frasco Gratis de Cannabis Medicinal</li>
              <li>✔ Cultivo en Nuestros Campos(con Reprocann)</li>
              <li>✔ Asesoramiento Exclusivo Personalizado</li>
            </ul>
            <div className="content-buttons_memberShip">
              <ButtonComponent
                className="card-button"
                onClick={() => window.open(url, "_blank")}
                color={{
                  background: "transparent",
                  text: "#0a9d6d", 
                  border: "2px solid white",
                  fontSize: ".8rem",
                }}
                text="WhatsApp"
              />

            <ButtonComponent
  className="card-button"
  onClick={() =>
    window.open("https://form.jotform.com/apidcasociacion/formulario-registro-APIDC-REPROCANN", "_blank")
  }
  color={{
    background: "transparent",
    text: "#ffff", 
    border: "2px solid white",
    fontSize: ".8rem",
  }}
  text="Completar Solicitud"
/>

            </div>
          </div>

          {/* Socio con Reprocann */}
          <div className="card">
            <h2 className="card-title">Gestor</h2>
            <p className="price-container"></p>
            <p className="card-subtitle">
              Comisiones de gestión y contención al socio adherente.
            </p>
            <ul className="benefits-list">
              <li>✔ Cultivo en Nuestros Campos (Con Reprocann)</li>
              <li>✔ Comisión de 10% por Nuevos Socios Activos</li>
              <li>✔ Capacitación para Gestores</li>
              <li>✔ Soporte Continuo y Asesoramiento Personalizado</li>
            </ul>
            <div className="content-buttons_memberShip">
              <ButtonComponent
                className="card-button"
                onClick={() => window.open(url, "_blank")}
                color={{
                  background: "transparent",
                  text: "#0a9d6d",
                  border: "2px solid white",
                  fontSize: ".5rem",
                }}
                text="WhatsApp"
              />

             <ButtonComponent
  className="card-button"
  onClick={() =>
    window.open("https://form.jotform.com/apidcasociacion/formulario-registro-APIDC-REPROCANN", "_blank")
  }
  color={{
    background: "transparent",
    text: "#ffff", 
    border: "2px solid white",
    fontSize: ".8rem",
  }}
  text="Completar Solicitud"
/>

            </div>
          </div>
        </div>
        <div className="whatsapp-cta-simple">
          <h3 className="whatsapp-cta-simple_title">
            ¿Necesitás ayuda para elegir?
          </h3>
          <a href={url} className="whatsapp-minibutton">
            <i className="fab fa-whatsapp"></i>
            <span>Consulta rápida por WhatsApp</span>
          </a>
        </div>
        <PaymentShipping />
        {/* Tabla de beneficios */}
        <div className="benefits-table-container">
          <h2 className="benefits-title">Comparación de Beneficios</h2>
          <table className="benefits-table">
            <thead>
              <tr>
                <th>Beneficio</th>
                <th>Socio Adherente</th>
                <th>Socio Premium / con Reprocann</th>
                <th>Socio Gestor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Participación en investigación de cultivo medicinal</td>
                <td>✔</td>
                <td>✔</td>
                <td>✔</td>
              </tr>
              <tr>
                <td>Distribución de aceite medicinal a hospitales</td>
                <td>✔</td>
                <td>✔</td>
                <td>✔</td>
              </tr>
              <tr>
                <td>Atención personalizada online para gestión de Reprocann</td>
                <td>✔</td>
                <td>✔</td>
                <td>✔</td>
              </tr>
            
              <tr>
                <td>Asesoramiento exclusivo</td>
                <td>✔</td>
                <td>✔</td>
                <td>✔</td>
              </tr>
              <tr>
                <td>Frasco gratis de cannabis medicinal</td>
                <td>✖</td>
                <td>✔</td>
                <td>✔</td>
              </tr>
              <tr>
                <td>Cultivo en nuestro campo (Con Reprocann)</td>
                <td>✖</td>
                <td>✔</td>
                <td>✔</td>
              </tr>

              <tr>
                <td>Comisión por nuevos socios activos referidos</td>
                <td>✖</td>
                <td>✖</td>
                <td>✔</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MembershipComponent;
