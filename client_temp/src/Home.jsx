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

  // VIDEO
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true); // autoplay seguro

  // Loader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // Play video cuando está listo el DOM (muteado para que no lo bloquee)
  useEffect(() => {
    if (!loading && videoRef.current) {
      const v = videoRef.current;
      v.muted = isMuted;
      v.volume = isMuted ? 0 : 1;
      v.play().catch(() => {
        // Si el navegador bloquea, se muestra igual y el user puede darle sonido
      });
    }
  }, [loading, isMuted]);

  // Datos usuario
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

  // Toggle sonido
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
          <div className="video-container">
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

  {/* ESTRENO arriba derecha */}
  <div className="release-label">
    ESTRENO DICIEMBRE 2025
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

        {/* ABOUT SECTION (resto igual que ya tenés) */}
        <div className="about-section" id="about-section">
          <div>
            <div className="content-about_section row text-center">
              {/* ...contenido existente... */}
            </div>
            {/* ...más secciones... */}
          </div>
        </div>
      </div>

      <QrSection />
      <div id="donate-now"></div>
      <Donations />
      <div id="asociarme-section"></div>
      <div id="ley-section" className="ley-section text-center">
        {/* ...contenido existente... */}
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
