import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./MembershipComponent.css"; // Archivo CSS

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
      if (selectedRole === "SocioConReprocan") {
        navigate("/membershipSection/SocioConReprocan");
      } else if (selectedRole === "SocioSinReprocan") {
        navigate("/membershipSection/socioSinReprocan");
      } else {
        navigate("/membershipSection/gestor");
      }
    } else {
      await loginWithRedirect({
        redirectUri: window.location.origin + "/",
      });
    }
  };

  return (
    <>
 
      {/* MEMBERSHIP SECTION */}
      <div className="membership-section">
      <h1 className="section-title">Opciones de Membresía</h1>
        <p className="section-subtitle">
          Elegí NNamNameeameel plan que mejor se adapte a tus necesidades. Primero debes ser
          socio adeherente para acceder a las opciones siguientes.
    </p>

           {/*  STEEPS*/}
        <p className="section-subtitle">Pasos</p>
      <div className="steps-container">
        <div className="step">
          <div className="circle">1</div>
          <p className="step-text">Unirse como Socio Adherente</p>
        </div>
        <div className="arrow">→</div>
        <div className="step">
          <div className="circle">2</div>
          <p className="step-text">Elegir Reprocan o Gestor</p>
        </div>
      </div>{" "}
  
        {/* Otras Cards (Distribuidas en tres columnas) */}
        <div className="cards-container">
          {/* Socio con Reprocan */}
          <div className="card-first">
            <h2 className="card-title">Socio adherente</h2>
            {/* <p className="card-description">
              Beneficios adicionales y prioridad en eventos.
            </p> */}
            <p className="price-container">
              {/* <span className="price-old">17.000</span> */}
              <span className="price-new">10.000 / mes</span>
            </p>
            <ul className="benefits-list">
              <li>✔ Participación en Investigación de Cultivo Medicinalo</li>
              <li>✔ Colaboración en Distribución de Aceite Medicinal a Hospitales de Gerontes</li>
              <li>✔ Atención Personalizada Online para Gestión del REPROCAN</li>
            </ul>
            <button
              className="card-button"
              onClick={() => handleRoleSelect("SocioSinReprocan")}
            >
              Más Información
            </button>
          </div>
          <div className="card">
            <h2 className="card-title">Socio Premium</h2>
            {/* <p className="card-description">
              Beneficios adicionales y prioridad en eventos.
            </p> */}
            <p className="price-container">
              <span className="price-old">200</span>
              <span className="price-new">150 / mes</span>
            </p>
            <ul className="benefits-list">
              <li>✔ Un Frasco Gratis de Cannabis Medicinal</li>
              <li>✔ Cultivo Exclusivo en Nuestros Campos</li>
              <li>✔ Asesoramiento Exclusivo Personalizado</li>
            </ul>
            <button
              className="card-button"
              onClick={() => handleRoleSelect("SocioConReprocan")}
            >
              Más Información
            </button>
          </div>

          {/* Socio con Reprocan */}
          <div className="card">
            <h2 className="card-title">Gestor</h2>
            {/* <p className="card-description">
              Beneficios adicionales y prioridad en eventos.
            </p> */}
            <p className="price-container">
              <span className="price-old">35</span>
              <span className="price-new">25 / mes</span>
            </p>
            <ul className="benefits-list">
              <li>✔ Cultivo en Nuestros Campos (Con Reprocan)</li>
              <li>✔ Comisión por Nuevos Socios Activos</li>
              <li>✔ Acceso a Material Exclusivo</li>
              <li>✔ Soporte Continuo y Asesoramiento Personalizado</li>
            </ul>
            <button
              className="card-button"
              onClick={() => handleRoleSelect("Gestor")}
            >
              Más Información
            </button>
          </div>
        </div>

        {/* Tabla de beneficios */}
      {/* Tabla de beneficios */}
<div className="benefits-table-container">
  <h2 className="benefits-title">Comparación de Beneficios</h2>
  <table className="benefits-table">
    <thead>
      <tr>
        <th>Beneficio</th>
        <th>Socio Adherente</th>
        <th>Socio Gestor</th>
        <th>Socio Premium / con Reprocan</th>
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
        <td>Atención personalizada online para gestión de Reprocan</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td>Acceso a newsletter mensual con noticias</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td>Frasco gratis de cannabis medicinal</td>
        <td>✖</td>
        <td>✖</td>
        <td>✔</td>
      </tr>
      <tr>
        <td>Cultivo en nuestro campo (Con Reprocan)</td>
        <td>✖</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td>Asesoramiento exclusivo</td>
        <td>✖</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td>Comisión por nuevos socios activos referidos</td>
        <td>✖</td>
        <td>✔</td>
        <td>✖</td>
      </tr>
      <tr>
        <td>Recomendación y promoción de la asociación</td>
        <td>✖</td>
        <td>✔</td>
        <td>✖</td>
      </tr>
    </tbody>
  </table>
</div>

      </div>
    </>
  );
};

export default MembershipComponent;
