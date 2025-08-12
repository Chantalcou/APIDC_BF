import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { registerUser, fetchUsers } from "./redux/actions/index.js";
import ButtonComponent from "./components/Button";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async"; //Optimizacion SEO
import { useAuth0 } from "@auth0/auth0-react";
import LoginModal from "./components/LoginModal.jsx";
import ContactInfo from "./components/ContactInfo.jsx";
import MovingBanner from "./components/MovingBanner.jsx";
import Reprocan from "./components/Reprocan.jsx";
import { WorkTogether } from "./components/WorkTogether.jsx";
import QrSection from "./components/QrSection.jsx";
import SeccionAs from "./components/SeccionAs.jsx";
import SpinnerComponent from "./components/SpinnerComponent.jsx";
import Donations from "./components/Donations.jsx";
import CannabisBenefits from './components/CannabisBenefits.jsx'
// Librerias de aniamcion
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, loginWithRedirect, user, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleLogoClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 2000);
  };

  const scrollToSection = (sectionId) => {
    $("html, body").animate(
      {
        scrollTop: $("#" + sectionId).offset().top,
      },
      1000
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          dispatch(registerUser(user, token));
          if (user.isAdmin) {
            dispatch(fetchUsers(token));
          }
        } catch (error) {
          console.error("Error obteniendo token:", error);
        }
      }
    };
    fetchUserData();
  }, [isAuthenticated, user, getAccessTokenSilently, dispatch]);

  const handleLogin = async () => {
    if (!captchaVerified) {
      setShowCaptcha(true); // Muestra el modal si el CAPTCHA no está verificado
      return;
    }

    try {
      await loginWithRedirect();
      if (isAuthenticated && user) {
        const token = await getAccessTokenSilently();
        dispatch(registerUser(user, token));
      }
    } catch (error) {
      console.error("Error durante el login o el registro:", error);
    }
  };

  return (
    <>
      {/* Optimización SEO */}
      <Helmet>
        <title>Inicio - Asociación Civil para el Cannabis Terapéutico</title>
        <meta
          name="description"
          content="Somos una asociación civil dedicada al estudio y uso terapéutico del cannabis. Conoce más sobre nuestros proyectos y servicios."
        />
        <meta
          name="keywords"
          content="cannabis medicinal, terapia con cannabis, uso terapéutico del cannabis, salud y cannabis, asociación civil cannabis, investigación cannabis, tratamientos naturales, bienestar, productos terapéuticos, cannabis en medicina"
        />

        <meta
          property="og:title"
          content="Inicio - Asociación Civil para el Cannabis Terapéutico"
        />

        <meta
          property="og:description"
          content="Somos una asociación civil dedicada al estudio y uso terapéutico del cannabis. Conoce más sobre nuestros proyectos y servicios."
        />

        <meta
          property="og:image"
          content="https://res.cloudinary.com/dqgjcfosx/image/upload/v1725976604/APIDC-LOGO-01-121x121_qnzw4d.png"
        />
        {/* Esta etiqueta le dice a las redes sociales cuál es la URL de tu página cuando se comparte en ellas. */}
        {/* Si estás en tu página de inicio, la URL sería algo como https://tu-dominio.com/ (reemplazando "tu-dominio" por el dominio real de tu sitio web). */}
        <meta property="og:url" content="https://apidc.ong" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div>
        {loading ? (
          <SpinnerComponent />
        ) : (
          <div className="container-fluid p-0 main-content">
            <div className="video-container">
              <video
                autoPlay
                muted
                loop
                playsInline // Mejor soporte móvil
                preload="metadata" // Evita carga completa inicial
                className="home-bg-video"
              >
                {/* Fallback para Safari */}
                <source
                  src="https://res.cloudinary.com/dqgjcfosx/video/upload/w_720,q_auto,f_mp4,vc_h264/v1234567/7667357-uhd_3840_2160_30fps_nm24my.mp4"
                  type="video/mp4"
                />

                {/* Fallback texto para navegadores muy antiguos */}
                <p>
                  Tu navegador no soporta videos HTML5. Te recomendamos
                  actualizar tu navegador.
                </p>
              </video>
              <div className="static-content d-flex flex-column justify-content-center align-items-center h-100">
                <img
                  alt="Logo APIDC"
                  src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1725973641/apidc-logo_hz26kf.png"
                  className={`home-image_center d-inline-block align-top ${
                    isSpinning ? "logo-spin" : ""
                  }`}
                  onClick={handleLogoClick}
                />
                <div className="d-flex flex-column flex-md-row gap-3">
                  <ButtonComponent
                    text="Conocenos"
                    onClick={() => scrollToSection("about-section")}
                    color={{
                      background: "transparent",
                      text: "#ffffff",
                      border: "2px solid white",
                    }}
                  />
                  {isAuthenticated && user ? (
                    <>
                      <a
                        href="https://form.jotform.com/apidcasociacion/formulario-registro-APIDC-REPROCANN"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: "#7BA12D",
                          color: "#ffffff",
                          padding: "10px 20px",
                          borderRadius: "5px",
                          border: "2px solid #7BA12D",
                          textDecoration: "none",
                          textAlign: "center",
                        }}
                        className="btn-asociate-custom"
                      >
                        ASOCIATE
                      </a>
                    </>
                  ) : (
                    <Link
                      style={{
                        backgroundColor: "#7BA12D",
                        color: "#ffffff",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        border: "2px solid #7BA12D",
                        textDecoration: "none",
                        textAlign: "center",
                      }}
                      className="btn-asociate-custom"
                      aria-label="Explorar Membresías"
                      onClick={handleShowModal || handleLogin}
                    >
                      ASOCIATE
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="about-section" id="about-section">
          <div>
            <div className="content-about_section row text-center">
              <div data-aos="fade-up" className="col-md-4 col-12 mb-4">
                <img
                  src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1740671503/Dise%C3%B1o_sin_t%C3%ADtulo_3_ocqnjy.png"
                  loading="lazy"
                  alt="Quienes somos"
                  className="img-fluid mb-3 circle-image"
                />

                <h3
                  className="home-title_about_section"
                  style={{ color: "#0a9d6d" }}
                >
                  Quienes Somos
                </h3>
                <p>
                  Somos una Asociación Civil sin fines de lucro, conformada por
                  un gran equipo de usuari@s, cultivadores y profesionales
                  comprometidos con el abordaje integral e interdisciplinario de
                  la planta de Cannabis. Nuestra asociación nace con el
                  propósito de fomentar el conocimiento, el procesamiento
                  responsable y los usos terapéuticos del Cannabis, siempre
                  desde una perspectiva inclusiva y colaborativa.
                </p>
              </div>
              <div data-aos="fade-down" className="col-md-4 col-12 mb-4">
                <img
                  src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1742918567/WhatsApp_Image_2025-03-25_at_13.01.24_v5f9ul.jpg"
                  alt="Nuestro camino"
                  className="img-fluid mb-3 circle-image"
                  loading="lazy"
                />
                <h3
                  style={{ color: "#0a9d6d" }}
                  className="home-title_about_section"
                >
                  Nuestro Camino
                </h3>
                <p>
                  Quienes conformamos la Asociación nos vinculamos con las
                  plantas de Cannabis y sus múltiples usos desde hace más de 30
                  años, aportando experiencia desde diversas disciplinas como
                  agronomía, medicina, genética, bioquímica, docencia, abogacía,
                  economía e investigación. A través de un enfoque clínico
                  interdisciplinario, ofrecemos acompañamiento especializado a
                  pacientes en tratamiento con Cannabis, asegurando un abordaje
                  integral y personalizado.
                </p>
              </div>
              <div data-aos="fade-up" className="col-md-4 col-12 mb-4">
                <img
                  src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1742998116/Dise%C3%B1o_sin_t%C3%ADtulo_2_ojffzb.png"
                  alt="A donde vamos"
                  className="img-fluid mb-3 circle-image_3"
                  loading="lazy"
                />

                <h3
                  style={{ color: "#0a9d6d" }}
                  className="home-title_about_section"
                >
                  A Dónde Vamos
                </h3>
                <p>
                  Aspiramos a ser un referente en el futuro del cannabis en
                  Argentina, consolidándonos en tres pilares clave: innovación
                  científica y tecnológica, promoviendo investigaciones de
                  vanguardia; acceso equitativo y políticas públicas, impulsando
                  regulaciones inclusivas y seguras; y educación y redes
                  colaborativas, fortaleciendo alianzas para democratizar el
                  conocimiento y erradicar estigmas. Nuestra visión es un futuro
                  en el que el cannabis sea sinónimo de salud, innovación y
                  justicia social.
                </p>
              </div>
            </div>

            <section className="present-section" id="present-section">
              <div className="overlay"></div>
              <div className="container">
                <div
                  className="content-present"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <header className="section-header">
                    <h2 className="section-title gradient-text">
                      Nuestro Presente
                    </h2>
                    <div className="title-divider"></div>
                  </header>
                  <p className="section-description">
                    Brindamos apoyo integral a usuarios terapéuticos, ofreciendo
                    un servicio de gestión especializada, asesoramiento
                    personalizado y vinculación certificada con REPROCANN.
                    Acompañamos a la comunidad con excelencia profesional,
                    garantizando máxima eficiencia en cada etapa del proceso.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <QrSection />
      <div id="donate-now"></div>
      <Donations />
      <div id="asociarme-section"></div>

      <div id="ley-section" className="ley-section text-center">
        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <img
            src="https://res.cloudinary.com/dqgjcfosx/image/upload/w_800,q_auto,f_auto/v1735841633/pexels-pavel-danilyuk-8112199_pvqmxc.jpg"
            alt="Ley 27.350"
            className="img-fluid"
            loading="lazy"
          />
        </div>
        <section id="ley" className="ley-container">
          <h2 style={{ color: "#0a9d6d" }}>Conocé más sobre la Ley 27.350</h2>
          <p className="ley-intro">
            Sancionada en 2017, esta ley regula la investigación y el acceso al
            cannabis medicinal en Argentina, garantizando su uso seguro y
            terapéutico.
          </p>

          <div className="ley-grid">
            <div className="ley-card">
              <h3>🔬 Investigación científica</h3>
              <p>
                Fomenta estudios clínicos sobre cómo se puede usar el cannabis
                con fines medicinales.
              </p>
            </div>
            <div className="ley-card">
              <h3>⚕️ Acceso terapéutico</h3>
              <p>
                Permite tratamientos con cannabis para pacientes con patologías
                específicas.
              </p>
            </div>
          </div>
        </section>
      </div>
      <SeccionAs />
      <Reprocan />
      <WorkTogether />
      <MovingBanner />
      <ContactInfo />
      <LoginModal show={showModal} handleClose={handleCloseModal} />
    </>
  );
};

export default Home;
