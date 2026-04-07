import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { registerUser, fetchUsers } from "./redux/actions/index.js";
import ButtonComponent from "./components/Button";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
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
import CannabisBenefits from "./components/CannabisBenefits.jsx";
import { FaArrowRight, FaQrcode, FaHeart } from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loginWithRedirect, user, getAccessTokenSilently } =
    useAuth0();

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [showFestiveBanner, setShowFestiveBanner] = useState(true);

  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const FORM_URL =
    "https://docs.google.com/forms/d/1guSRMEtLnfwWshZFkZ8TDF1DlSh2y6av8TWgYh4RsHY/edit";
  const QR_URL =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
    encodeURIComponent(FORM_URL);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    if (!loading && videoRef.current) {
      const v = videoRef.current;
      v.muted = isMuted;
      v.volume = isMuted ? 0 : 1;
      v.play().catch(() => {});
    }
  }, [loading, isMuted]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          dispatch(registerUser(user, token));
          if (user.isAdmin) dispatch(fetchUsers(token));
        } catch (error) {
          console.error("Error obteniendo token:", error);
        }
      }
    };
    fetchUserData();
  }, [isAuthenticated, user, getAccessTokenSilently, dispatch]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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

  const handleLogin = async () => {
    if (!captchaVerified) {
      setShowCaptcha(true);
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

  const toggleMute = () => {
    if (!videoRef.current) return;
    const v = videoRef.current;
    const newMuted = !v.muted;
    v.muted = newMuted;
    v.volume = newMuted ? 0 : 1;
    setIsMuted(newMuted);
    if (!newMuted) {
      v.play().catch(() => {});
    }
  };

  const handleOpenForm = () => {
    window.open(FORM_URL, "_blank", "noopener,noreferrer");
  };

  const closeFestiveBanner = () => {
    setShowFestiveBanner(false);
  };

  return (
    <>
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
        <meta property="og:url" content="https://apidc.ong" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div>
        {loading ? (
          <SpinnerComponent />
        ) : (
          <div className="container-fluid p-0 main-content">
            <div className="home-video-container">
              <video
                ref={videoRef}
                className="home-bg-video"
                autoPlay
                loop
                playsInline
                muted={isMuted}
                preload="auto"
              >
                <source
                  src="https://res.cloudinary.com/dqgjcfosx/video/upload/f_auto:video,q_auto:best,w_1920/v1762520200/TYZER2025-09-19_at_12.53.31_1_bxgf6p.mp4"
                  type="video/mp4"
                />
                Tu navegador no soporta videos HTML5.
              </video>

              {/* STACK: banner arriba / donaciones abajo */}
              <div className="hero-mobile-stack">
                {/* BANNER AMNISTÍA */}
                <div
                  className="event-banner-professional event-banner-premium"
                  data-aos="fade-down"
                  data-aos-duration="800"
                >
                  <div className="event-banner__inner">
                    <div className="event-banner__shine"></div>
                    <div className="event-banner__glow"></div>

                    <div className="event-banner__content">
                      <div className="event-banner__title">
                        <span className="highlight attention-line">
                          ATENCIÓN
                        </span>
                        <span className="highlight main-line">
                          AMNISTÍA EN EL CINE
                        </span>
                      </div>

                      <div className="event-banner__details">
                        <div className="event-detail">
                          <i className="fas fa-map-marker-alt"></i>
                          <span>Cine Monumental Rosario</span>
                        </div>

                        <div className="event-detail">
                          <i className="far fa-calendar-alt"></i>
                          <span>Sábado 9 de mayo</span>
                        </div>

                        <div className="event-detail">
                          <i className="fas fa-clock"></i>
                          <span>Funciones: 20:30hs / 22:00hs</span>
                        </div>
                      </div>

                      <a
                        href="https://compras.evento-simple.com/apidc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="event-button event-button-premium"
                      >
                        SACA TUS ENTRADAS
                        <i className="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* DONACIONES */}
                <div
                  className="donations-mini"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="donations-mini__badge">
                    <FaHeart />
                    <span>APOYÁ NUESTRA CAUSA</span>
                  </div>

                  <div className="donations-mini__content">
                    <h3 className="donations-mini__title">
                      Tu apoyo transforma vidas
                    </h3>

                    <p className="donations-mini__subtitle">
                      Cada donación nos ayuda a continuar con nuestro trabajo
                      por una comunidad más saludable
                    </p>

                    <div
                      className="cta-split"
                      role="group"
                      aria-label="Acciones para donar"
                    >
                      <button
                        type="button"
                        className="cta-half cta-button"
                        onClick={handleOpenForm}
                        aria-label="Ir al formulario de donaciones"
                      >
                        <span className="cta-title-row">
                          Ir al formulario{" "}
                          <FaArrowRight className="arrow-icon" />
                        </span>
                        <span className="cta-sub">
                          Rápido • Seguro • Transparente
                        </span>
                      </button>

                      <a
                        className="cta-half cta-qr"
                        href={FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Abrir formulario desde el QR"
                      >
                        <div className="qr-top">
                          <FaQrcode className="qr-icon" />
                          <span className="qr-label">Escanear QR</span>
                        </div>

                        <div className="qr-frame">
                          <img
                            src={QR_URL}
                            alt="QR para formulario de donaciones APIDC"
                            className="qr-image"
                            loading="lazy"
                          />
                        </div>

                        <span className="qr-sub">Abrir en el teléfono</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón sonido centrado abajo */}
              <button
                className="sound-toggle-btn"
                type="button"
                onClick={toggleMute}
              >
                {isMuted ? "🔊 Activar sonido" : "🔇 Silenciar"}
              </button>

              {/* Logo abajo izquierda */}
              <div className="static-content">
                <img
                  alt="Logo APIDC"
                  src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1725973641/apidc-logo_hz26kf.png"
                  className={`home-image_center ${isSpinning ? "logo-spin" : ""}`}
                  onClick={handleLogoClick}
                />
              </div>
            </div>
          </div>
        )}

        {/* ABOUT SECTION */}
        <div className="about-section" id="about-section">
          <div>
            <div className="content-about_section row text-center">
              <div data-aos="fade-up" className="col-md-4 col-12 mb-4">
                <img
                  src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1740671503/Dise%C3%B1o_sin_t%C3%ADtulo_3_ocqnjy.png"
                  loading="lazy"
                  alt="Quiénes somos"
                  className="img-fluid mb-3 circle-image"
                />
                <h3
                  className="home-title_about_section"
                  style={{ color: "#0a9d6d" }}
                >
                  Quienes Somos
                </h3>
                <p>
                  Somos una asociación civil sin fines de lucro, conformada por
                  un gran equipo de usuari@s, cultivadores y profesionales
                  comprometidos con el abordaje integral e interdisciplinario de
                  la planta de Cannabis.
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
                  Más de 30 años de experiencia desde agronomía, medicina,
                  genética, bioquímica, docencia, abogacía, economía e
                  investigación.
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
                  Innovación científica, acceso equitativo, educación y redes
                  colaborativas para un futuro donde el cannabis sea sinónimo de
                  salud, innovación y justicia social.
                </p>
              </div>
            </div>

            <section className="present-section" id="present-section">
              <div className="present-overlay"></div>
              <div className="present-gradient-overlay"></div>
              <div className="container">
                <div
                  className="content-present"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="200"
                >
                  <header className="section-header">
                    <h2 className="section-title gradient-text-professional">
                      Nuestro Presente
                    </h2>
                    <div className="title-divider">
                      <div className="divider-line"></div>
                      <div className="divider-dot"></div>
                      <div className="divider-line"></div>
                    </div>
                  </header>

                  <p className="section-description__present">
                    Brindamos apoyo integral a usuarios terapéuticos, con
                    gestión especializada, asesoramiento personalizado y
                    vinculación certificada con REPROCANN.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <QrSection />
      <div id="donate-now"></div>
      {/* <Donations /> */}
      <div id="asociarme-section"></div>
      <div id="ley-section" className="ley-section text-center"></div>
      {/* <SeccionAs /> */}
      <Reprocan />
      <WorkTogether />
      <MovingBanner />
      <ContactInfo />

      <LoginModal show={showModal} handleClose={handleCloseModal} />
    </>
  );
};

export default Home;