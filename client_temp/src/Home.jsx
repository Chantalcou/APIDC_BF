import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import $ from "jquery";
import { registerUser, fetchUsers } from "./redux/actions/index.js";
import ScrollArrow from "./components/ScrollArrow.jsx";
import ButtonComponent from "./components/Button";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async"; //Optimizacion SEO
import { useAuth0, isAuthenticated, isLoading } from "@auth0/auth0-react";
import { FaArrowRight } from "react-icons/fa";
import LoginModal from "./components/LoginModal.jsx";
import ContactInfo from "./components/ContactInfo.jsx";
import { WorkTogether } from "./components/WorkTogether.jsx";
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

  useEffect(() => {
    // Simula una carga de datos o cualquier otra operación asíncrona
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
    console.log("entra aca?????");
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
        <div className="container-fluid p-0 main-content">
          <div className="video-container">
            <video autoPlay muted loop className="home-bg-video">
              <source
                src="https://res.cloudinary.com/dqgjcfosx/video/upload/w_720,q_auto,f_auto/v1234567/7667357-uhd_3840_2160_30fps_nm24my.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="static-content d-flex flex-column justify-content-center align-items-center h-100">
              {/* Texto agregado sobre el logo */}
              <h1 className="welcome-name">
                {userFromRedux?.name ? `Bienvenid@ ${userFromRedux.name}` : ""}
              </h1>

              <img
                alt="Logo APIDC"
                src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1725973641/apidc-logo_hz26kf.png"
                className={`home-image_center d-inline-block align-top ${
                  isSpinning ? "logo-spin" : ""
                }`}
                onClick={handleLogoClick}
              />

              <ButtonComponent
                text="Conocenos"
                onClick={() => scrollToSection("about-section")}
                color={{
                  background: "transparent",
                  text: "#ffffff",
                  border: "2px solid white",
                }}
              />
            </div>{" "}
          </div>
        </div>

        <div className="about-section" id="about-section">
          <div>
            <div className="content-about_section row text-center my-5 ">
              <div className="col-md-4 col-12 mb-4">
                <img
                  src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1726139381/imagen-3-apidc_sezunb.jpg"
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
                  Somos una Asociación Civil sin fines de lucro. Conformada por
                  un gran equipo de personas que se relaciona de manera directa
                  con el Cannabis, su procesamiento y sus usos terapéuticos.
                </p>
              </div>
              <div className="col-md-4 col-12 mb-4">
                <img
                  src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1726139381/imagen-2-apidc_jd0dnj.jpg"
                  alt="Nuestro camino"
                  className="img-fluid mb-3"
                />
                <h3
                  style={{ color: "#0a9d6d" }}
                  className="home-title_about_section"
                >
                  Nuestro Camino
                </h3>
                <p>
                  Quienes conformamos la Asociación nos vinculamos con las
                  plantas de Cannabis y sus múltiples usos desde hace más de 10
                  años, cada uno a través de diversas disciplinas: agronomía,
                  medicina, genética, bioquímica, docencia, abogacía, economía e
                  investigación.
                </p>
              </div>
              <div className="col-md-4 col-12 mb-4">
                <img
                  src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1726139381/imagen-1-apidc_vtapiq.jpg"
                  alt="A donde vamos"
                  className="img-fluid mb-3"
                />
                <h3
                  style={{ color: "#0a9d6d" }}
                  className="home-title_about_section"
                >
                  A Dónde Vamos
                </h3>
                <p>
                  Nuestro principal objetivo como Asociación es ser un actor
                  fundamental en el desarrollo y la investigación del Cannabis a
                  nivel nacional.
                </p>
              </div>
            </div>
            <div className="static-content d-flex flex-column justify-content-center align-items-center mt-5 h-100 position-relative">
              <ScrollArrow
                onClick={() => scrollToSection("ley-section")}
                color=" #202020"
              />
            </div>

            <div id="ley-section" className="ley-section text-center">
              <img
                src="https://res.cloudinary.com/dqgjcfosx/image/upload/q_100,w_800/v1735841633/pexels-pavel-danilyuk-8112199_pvqmxc.jpg
"
                alt="Ley 27.350"
                className="img-fluid"
              />
              <h3
                style={{ color: "#0a9d6d" }}
                className="home-title_about_section"
              >
                Conoce más sobre la Ley 27.350
              </h3>
              <p className="home-subTitle_about_section">
                La Ley 27.350 fue sancionada en 2017 y establece un marco
                regulatorio para la investigación médica y científica del
                cannabis medicinal en Argentina. Además, promueve el acceso
                terapéutico al cannabis para pacientes que lo necesiten,
                asegurando su derecho a la salud. A través del REPROCANN,
                permite a usuarios registrados cultivar cannabis de forma legal
                para uso medicinal.
              </p>
              <div className="static-content d-flex flex-column justify-content-center align-items-center mt-5 h-100 position-relative">
                <ScrollArrow
                  onClick={() => scrollToSection("present-section")}
                  color=" #202020"
                />
              </div>
            </div>

            <div className="present-section" id="present-section">
              <div className="present-content">
                <h2 style={{ color: "#0a9d6d" }}>NUESTRO PRESENTE</h2>
                <p>
                  Actualmente asistimos a usuarios terapéuticos; acompañando a
                  la comunidad con el servicio de gestión, asesoramiento y
                  vinculación a REPROCANN. Actualmente asistimos a usuarios
                  terapéuticos; acompañando a la comunidad con el servicio de
                  gestión, asesoramiento y vinculación a REPROCANN. Actualmente
                  asistimos a usuarios terapéuticos; acompañando a la comunidad
                  con el servicio de gestión.
                </p>

                <div className="btn-asociarte-custom text-center">
                  <ButtonComponent
                    text="ASOCIATE"
                    onClick={() => scrollToSection("asociarme-seccion")}
                    color={{
                      background: "transparent",
                      text: "black",
                      border: "2px solid black",
                    }}
                    customClass="hover-change-to-white"
                  />
                </div>
              </div>

              <div className="present-image">
                <img
                  src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1727005386/apidc-all_d15wow.jpg"
                  alt="Nuestro presente"
                />
              </div>
            </div>

            <div className="static-content d-flex flex-column justify-content-center align-items-center h-100 position-relative">
              <ScrollArrow
                onClick={() => scrollToSection("membership-section")}
                color="#202020"
              />
            </div>
          </div>
        </div>

        {/* ASOCIARME SECTION */}
        <div className="container-video_2 my-1" id="membership-section">
          {/* Fondo del video con superposición */}
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

            {/* Contenido sobre el video */}
            <div
              id="asociarme-seccion"
              className="d-flex flex-column justify-content-center align-items-center h-100 text-white"
              style={{ zIndex: 99 }} // Superposición semitransparente
            >
              <h1
                id="asociarme-section"
                className="banner-title mb-3"
                style={{ fontSize: "2.5rem", fontWeight: "bold" }}
              >
                ¡Asóciate Ahora!
              </h1>
              <p
                className="sub-title_banner text-center mb-4"
                style={{ maxWidth: "700px", lineHeight: "1.6" }}
              >
                Descubre las opciones de membresía que ofrecemos y elige la que
                mejor se adapte a tus necesidades.
              </p>
              {!isAuthenticated && !user ? (
                <>
                  <Link
                    onClick={handleShowModal || handleLogin}
                    className="btn-asociate-custom"
                    aria-label="Explorar Membresías - ESTA AUTENTICADO"
                  >
                    Explorar Membresías
                    <FaArrowRight className="btn-icon" />
                  </Link>
                </>
              ) : (
                <Link
                  to="/membershipSection"
                  className="btn-asociate-custom"
                  aria-label="Explorar Membresías"
                >
                  Explorar Membresías
                  <FaArrowRight className="btn-icon" />
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* ASOCIARME SECTION */}
      </div>
      <ContactInfo />
      <WorkTogether />

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
      </div>
      <LoginModal show={showModal} handleClose={handleCloseModal} />
    </>
  );
};

export default Home;
