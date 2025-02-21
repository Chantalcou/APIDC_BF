import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { registerUser, fetchUsers } from "./redux/actions/index.js";
import ScrollArrow from "./components/ScrollArrow.jsx";
import ButtonComponent from "./components/Button";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async"; //Optimizacion SEO
import { useAuth0 } from "@auth0/auth0-react";
import { FaArrowRight, FaSeedling, FaClipboardCheck } from "react-icons/fa";
import LoginModal from "./components/LoginModal.jsx";
import ContactInfo from "./components/ContactInfo.jsx";
import MovingBanner from "./components/MovingBanner.jsx";
import { WorkTogether } from "./components/WorkTogether.jsx";
import SeccionAs from "./components/SeccionAs.jsx";
import NewsletterBanner from "./components/NewsLetterBanner.jsx";
// Librerias de aniamcion
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const userFromRedux = useSelector((state) => state.user);
  const {
    isAuthenticated,
    loginWithRedirect,
    // logout,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showModal, setShowModal] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // ANIMACION
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones
      easing: "ease-in-out", // Efecto de animación
      once: true, // La animación ocurre solo una vez cuando el elemento entra en la vista
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simula una carga de 2 segundos
  }, []);

  // if (loading) {
  //   return <SpinnerComponent />;
  // }

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
          dispatch(registerUser(user, token)); // Despacha la acción de registro
          // Si es admin, realizar la acción de obtener usuarios
          if (user.isAdmin) {
            dispatch(fetchUsers(token)); // Solo llamar si el usuario es admin
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
        dispatch(registerUser(user, token)); // Llamamos a la acción `registerUser` solo después de la verificación
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
        <meta property="og:url" content="https://example.com/" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div>
        {loading}
        <div className="container-fluid p-0 main-content">
          <div className="video-container">
            {/* <video autoPlay muted loop className="home-bg-video">
              <source
                src="https://res.cloudinary.com/dqgjcfosx/video/upload/w_720,q_auto,f_auto/v1234567/7667357-uhd_3840_2160_30fps_nm24my.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video> */}
            <video
              autoPlay
              muted
              loop
              playsInline // Mejor soporte móvil
              preload="metadata" // Evita carga completa inicial
              className="home-bg-video"
              poster="https://res.cloudinary.com/dqgjcfosx/image/upload/w_720,q_auto,f_auto/v1234567/thumbnail_video.jpg" // Thumbnail de pre-carga
            >
              {/* Priorizar formato WebM (mejor compresión) */}
              <source
                src="https://res.cloudinary.com/dqgjcfosx/video/upload/f_webm,w_480,q_auto:good,vc_h265/v1234567/7667357-uhd_3840_2160_30fps_nm24my.mp4"
                type="video/webm"
              />

              {/* Fallback para Safari */}
              <source
                src="https://res.cloudinary.com/dqgjcfosx/video/upload/w_720,q_auto,f_mp4,vc_h264/v1234567/7667357-uhd_3840_2160_30fps_nm24my.mp4"
                type="video/mp4"
              />

              {/* Fallback texto para navegadores muy antiguos */}
              <p>
                Tu navegador no soporta videos HTML5. Te recomendamos actualizar
                tu navegador.
              </p>
            </video>
            <div className="static-content d-flex flex-column justify-content-center align-items-center h-100">
              {/* Texto agregado sobre el logo */}
              <h1 className="welcome-name">
                {user
                  ? `Bienvenid@ ${user.name}`
                  : "Asociación de Cannabis Medicinal"}
              </h1>

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
                <ButtonComponent
                  text="Asociate Ahora"
                  onClick={() => scrollToSection("asociate-ahora-2")}
                  color={{
                    background: "white",
                    text: "#0a9d6d",
                    border: "2px solid #0a9d6d",
                  }}
                  icon={<FaArrowRight className="me-2" />}
                />
              </div>
              {/* <p className="text-white mt-3 text-center">
              ⭐️ +500 socios confían en nosotros | Registro REPROCANN 100%
              legal ⭐️
            </p> */}
            </div>
          </div>
        </div>
        {/* 
        <div id="beneficios" className="benefits-section py-5">
          <h2 className="text-center mb-4">✨ ¿Por Qué Elegir APIDC?</h2>
          <div className="row justify-content-center">
            {[
              {
                icon: "⚖️",
                title:
                  "Seguridad jurídica: Todo bajo el marco de la Ley 27.350.",
                text: "Médicos, abogados y cultivadores trabajando por vos.",
              },
              {
                icon: "🌱",
                title: "Cultivo Seguro",
                text: "Acceso a espacios de cultivo supervisados",
              },
              {
                icon: "💊",
                title: "Productos Controlados",
                text: "Cannabis medicinal con análisis de laboratorio",
              },
            ].map((item, index) => (
              <div key={index} className="col-md-4 mb-4" data-aos="fade-up">
                <div className="benefit-card p-4">
                  <div className="icon-display">{item.icon}</div>
                  <h5>{item.title}</h5>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <div className="about-section" id="about-section">
          <div>
            <div className="content-about_section row text-center my-5 ">
              <div data-aos="fade-up" className="col-md-4 col-12 mb-4">
                <img
                  src="https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto/v1726139381/imagen-3-apidc_sezunb.jpg"
                  loading="lazy"
                  alt="Quienes somos"
                  className="img-fluid mb-3"
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
                  src="https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto/v1726139381/imagen-2-apidc_jd0dnj.jpg"
                  alt="Nuestro camino"
                  className="img-fluid mb-3"
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
                  src="https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto/v1726139381/imagen-1-apidc_vtapiq.jpg"
                  alt="A donde vamos"
                  className="img-fluid mb-3"
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
            <div className="static-content d-flex flex-column justify-content-center align-items-center mt-5 h-100 position-relative">
              <ScrollArrow
                onClick={() => scrollToSection("ley-section")}
                color=" #202020"
              />
            </div>

            {/* <SeccionAs/> */}

            <section
              className="present-section"
              id="present-section"
              style={{ padding: "60px 20px" }}
            >
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-6 mb-4">
                    <header className="text-center">
                      <h2
                        style={{
                          color: "#0a9d6d",
                          fontSize: "2.5rem",
                          fontWeight: "700",
                        }}
                      >
                        Nuestro Presente
                      </h2>
                    </header>

                    <div className="present-description">
                      <p
                        className="lead"
                        style={{ fontSize: "1rem", color: "#333" }}
                      >
                        Brindamos apoyo integral a usuarios terapéuticos,
                        ofreciendo un servicio de gestión, asesoramiento y
                        vinculación con REPROCANN. Acompañamos a la comunidad
                        con un enfoque profesional, garantizando eficiencia en
                        cada paso del proceso.
                      </p>

                      {/* <h3
                        style={{
                          color: "#333",
                          fontSize: "1.5rem",
                          fontWeight: "300",
                        }}
                      >
                        Lo que ofrecemos hoy
                      </h3> */}
                    </div>

                    <div className="text-center mt-5">
                      <ButtonComponent
                        text="ASÓCIATE"
                        onClick={() => scrollToSection("asociate-ahora-2")}
                        color={{
                          background: "#0a9d6d",
                          text: "white",
                          border: "2px solid #0a9d6d",
                        }}
                        customClass="hover-change-to-light"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="present-image">
                      <img
                        src="https://res.cloudinary.com/dqgjcfosx/image/upload/w_800,q_auto,f_auto/v1727005386/apidc-all_d15wow.jpg"
                        alt="Imagen ilustrativa de nuestro servicio terapéutico"
                        loading="lazy"
                        style={{
                          width: "100%",

                          borderRadius: "15px",
                          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="static-content d-flex flex-column justify-content-center align-items-center h-100 position-relative mt-5">
                  <ScrollArrow
                  onClick={() => scrollToSection("membership-section")}
                  color="#202020"
                  />
                  </div> */}
              </div>
            </section>
          </div>
        </div>

        <div id="asociate-ahora-2"></div>
        <SeccionAs />

        {/* ASOCIARME SECTION */}
        {/* <div className="container-video_2 my-1" id="membership-section">
   
          <div className="bg-banner text-center position-relative">
            <video
              autoPlay
              muted
              loop
              className="bg-video position-absolute w-100 h-100"
              style={{ objectFit: "cover", top: 0, left: 0 }}
              poster="https://res.cloudinary.com/dqgjcfosx/image/upload/v1234567890/poster-image.jpg"
            >
              <source
                src="https://res.cloudinary.com/dqgjcfosx/video/upload/v1726834753/7667101-uhd_3840_2160_30fps_tpxp07.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            <div
              id="asociarme-seccion"
              className="d-flex flex-column justify-content-center align-items-center h-100 text-white"
              style={{ zIndex: 99 }} 
            >
              <h1 id="asociarme-section" className="banner-title mb-3">
                ASOCIATE
              </h1>
              <p
                className="sub-title_banner text-center mb-4"
                style={{ maxWidth: "700px", lineHeight: "1.6" }}
              >
                Descubre las opciones de categorías que ofrecemos y elige la que
                mejor se adapte a tus necesidades.
              </p>
              {!isAuthenticated && !user ? (
                <>
                  <Link
                    onClick={handleShowModal || handleLogin}
                    className="btn-asociate-custom"
                    aria-label="Explorar Membresías - ESTA AUTENTICADO"
                  >
                    Explorar Categorías
                    <FaArrowRight className="btn-icon" />
                  </Link>
                </>
              ) : (
                <Link
                  to="/membershipSection"
                  className="btn-asociate-custom"
                  aria-label="Explorar Membresías"
                >
                  Explorar Categorías
                  <FaArrowRight className="btn-icon" />
                </Link>
              )}
            </div>
          </div>
        </div> */}
      </div>

      <ContactInfo />

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
        <section id="ley" class="ley-container">
          <h2 style={{ color: "#0a9d6d" }}>Conoce más sobre la Ley 27.350</h2>
          <p class="ley-intro">
            Sancionada en 2017, esta ley regula la investigación y el acceso al
            cannabis medicinal en Argentina, garantizando su uso seguro y
            terapéutico.
          </p>

          <div class="ley-grid">
            <div class="ley-card">
              <h3>🔬 Investigación científica</h3>
              <p>
                Impulsa estudios clínicos sobre los usos medicinales del
                cannabis.
              </p>
            </div>
            <div class="ley-card">
              <h3>⚕️ Acceso terapéutico</h3>
              <p>
                Permite tratamientos con cannabis para pacientes con patologías
                específicas.
              </p>
            </div>
            {/* <div class="ley-card">
                    <h3>🌿 REPROCANN</h3>
                    <p>Autoriza el cultivo controlado para uso medicinal.</p>
                  </div> */}
          </div>
        </section>
        <div className="static-content d-flex flex-column justify-content-center align-items-center mt-5 h-100 position-relative">
          <ScrollArrow
            onClick={() => scrollToSection("present-section")}
            color=" #202020"
          />
        </div>
      </div>

      <WorkTogether />
      <MovingBanner />
      {/* 
      <div className="content-summary">
        <details className="toggleFaqs_faqsQuestions mt-1">
          <summary className="toggleFaqs_faqsQuestions__RozJk">
            ¿Qué es una asociación civil de cannabis?
            <span className="toggleFaqs_faqsQuestions__arrow">➔</span>
          </summary>
          <p className="summary-p">
            Una asociación civil de cannabis es una organización sin fines de
            lucro que promueve la investigación, educación y el uso responsable
            de la planta de cannabis, tanto para fines medicinales como
            recreativos, según las normativas locales.
          </p>
        </details>

        <details className="toggleFaqs_faqsQuestions">
          <summary className="toggleFaqs_faqsQuestions__RozJk">
            ¿Cómo puedo asociarme a una asociación civil de cannabis?
            <span className="toggleFaqs_faqsQuestions__arrow">➔</span>
          </summary>
          <p className="summary-p">
            Para asociarte, generalmente debes ser mayor de edad, presentar
            ciertos documentos como tu identificación y completar un formulario
            de solicitud. Cada asociación tiene sus propios requisitos
            específicos, por lo que es recomendable contactarlos directamente.
          </p>
        </details>

        <details className="toggleFaqs_faqsQuestions">
          <summary className="toggleFaqs_faqsQuestions__RozJk">
            ¿Cuáles son los beneficios de ser miembro de una asociación civil de
            cannabis?
            <span className="toggleFaqs_faqsQuestions__arrow">➔</span>
          </summary>
          <p className="summary-p">
            Los beneficios pueden incluir acceso a productos de cannabis de
            calidad controlada, participación en programas educativos, la
            posibilidad de influir en políticas públicas relacionadas con el
            cannabis, y el derecho a votar en decisiones dentro de la
            asociación.
          </p>
        </details>

        <details className="toggleFaqs_faqsQuestions">
          <summary className="toggleFaqs_faqsQuestions__RozJk">
            ¿Es legal formar una asociación civil de cannabis?
            <span className="toggleFaqs_faqsQuestions__arrow">➔</span>
          </summary>
          <p className="summary-p">
            La legalidad depende del país y de las leyes locales sobre el
            cannabis. En muchos lugares, es legal formar asociaciones civiles
            con el objetivo de promover el uso medicinal del cannabis, pero en
            otros lugares aún puede ser ilegal.
          </p>
        </details>
      </div> */}
      <LoginModal show={showModal} handleClose={handleCloseModal} />
    </>
  );
};

export default Home;
