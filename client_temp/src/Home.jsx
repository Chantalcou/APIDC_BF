import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import $ from "jquery";
import ScrollArrow from "./components/ScrollArrow.jsx";
import ButtonComponent from "./components/Button";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async"; //Optimizacion SEO
import { useAuth0 } from "@auth0/auth0-react";
import SpinnerComponent from "./components/SpinnerComponent.jsx";
import GestionarReprocan from "./components/GestionarReprocan.jsx";
import MovingBanner from "./components/MovingBanner.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Home.css";

const Home = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isAuthenticated,
    loginWithRedirect,
    // logout,
    user,
    // getAccessTokenSilently,
  } = useAuth0();

  const userFromRedux = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };
  useEffect(() => {
    if (selectedRole) {
      console.log("Role updated in useEffect:", selectedRole);
      handleLogin(); //La función de Login actualzia el rol
    }
  }, [selectedRole]); // Ejecutar cuando selectedRole cambie

  useEffect(() => {
    // Simula una carga de datos o cualquier otra operación asíncrona
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simula una carga de 2 segundos
  }, []);

  if (loading) {
    return <SpinnerComponent />;
  }

  const handleLogoClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000);
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
    if (isAuthenticated) {
      if (!selectedRole) {
        console.log("No role selected, please select a role.");
        return;
      }

      // Evaluar roles de manera exclusiva
      if (selectedRole === "SocioConReprocan") {
        navigate("/SocioConReprocan");
      } else if (selectedRole === "SocioSinReprocan") {
        navigate("/SocioSinReprocan");
      } else {
        navigate("/gestor"); // Default para otros roles no especificados
      }
    } else {
      try {
        await loginWithRedirect({
          redirectUri: window.location.origin + "/",
        });
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };

  // Banner
  const logos = [
    {
      src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1736344234/conicet_eg7ncj.jpg",
      alt: "Conicet",
    },
    {
      src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1736345614/andreani_e9flk9.png",
      alt: "Andreani",
    },
    {
      src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1736345887/racme_u3r9wv.jpg",
      alt: "Ministerio economia",
    },
    {
      src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1736344234/conicet_eg7ncj.jpg",
      alt: "Conicet",
    },
    {
      src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1736345614/andreani_e9flk9.png",
      alt: "Andreani",
    },
    {
      src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1736345887/racme_u3r9wv.jpg",
      alt: "Ministerio economia",
    },
  ];

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
            <video playsinline controls>
              <source
                src="https://res.cloudinary.com/dqgjcfosx/video/upload/w_720,q_auto,f_auto/v1234567/7667357-uhd_3840_2160_30fps_nm24my.mp4"
                type="video/mp4"
              ></source>
              Your browser does not support the video tag.
            </video>
            {/* <video autoPlay muted loop className="home-bg-video">
              <source
                src="https://res.cloudinary.com/dqgjcfosx/video/upload/w_720,q_auto,f_auto/v1234567/7667357-uhd_3840_2160_30fps_nm24my.mp4"

                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video> */}
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
              <ScrollArrow onClick={() => scrollToSection("ley-section")} />
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
              />
            </div>
          </div>
        </div>

        <div id="membership-section" className="py-1 bg-light">
          <div className="container-video_2 my-1">
            <div className="bg-banner text-center position-relative">
              <video
                autoPlay
                muted
                loop
                className="bg-video position-absolute w-100 h-100"
                style={{ objectFit: "cover", top: 0, left: 0 }}
              >
                <source
                  src="https://res.cloudinary.com/dqgjcfosx/video/upload/v1726834753/7667101-uhd_3840_2160_30fps_tpxp07.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              <div
                id="asociarme-seccion"
                className="d-flex flex-column justify-content-center align-items-center h-100"
                style={{ zIndex: 99 }}
              >
                <h1 id="asociarme-section" className="banner-title">
                  ASOCIARME
                </h1>
                <p className="sub-title_banner text-center mb-5">
                  Descubri las opciones de membresía que ofrecemos y eligi la
                  que mejor se adapte a tus necesidades.
                </p>
              </div>
            </div>
          </div>

          <div className="row mt-5 justify-content-center text-center content-cards">
            <div className="col-md-4 col-sm-6 mb-4">
              <div
                className="card h-100 p-3 border-light shadow-sm"
                style={{ transition: "transform 0.3s", borderRadius: "10px" }}
              >
                <div className="card-body">
                  <i
                    className="fas fa-user-tie fa-2x mb-3"
                    style={{ color: "#0a9d6d" }}
                  ></i>
                  <h5
                    className="card-title"
                    style={{ fontWeight: "bold", color: "#0a9d6d" }}
                  >
                    Gestor
                  </h5>
                  <p className="card-text text-muted">
                    Apoya y guía a otros en el proceso de asociación y gestión
                    de beneficios.
                  </p>
                  <div className="text-center mt-5 btn-asociarte-custom_2">
                    <ButtonComponent
                      text="Ser Gestor"
                      // onClick={() => navigate("/gestor")}
                      onClick={() => {
                        handleRoleSelect("gestor"); // Establece el rol como "gestor"
                        handleLogin();
                      }}
                      color={{
                        background: "transparent",
                        text: "black",
                        border: "2px solid black",
                      }}
                      customClass="hover-change-to-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 mb-4">
              <div
                className="card h-100 p-3 border-light shadow-sm"
                style={{
                  transition: "transform 0.3s",
                  borderRadius: "10px",
                  color: "#0a9d6d",
                }}
              >
                <div className="card-body">
                  <i
                    className="fas fa-handshake fa-2x mb-3"
                    style={{ color: "#0a9d6d" }}
                  ></i>
                  <h5
                    className="card-title"
                    style={{ fontWeight: "bold", color: "#0a9d6d" }}
                  >
                    Socio Adherente (sin Reprocan)
                  </h5>
                  <p className="card-text text-muted">
                    Obtén acceso a asesoría, descuentos y un espacio en nuestra
                    comunidad.
                  </p>
                  <div className="text-center mt-5 btn-asociarte-custom_2">
                    <ButtonComponent
                      text="Socio Adherente"
                      onClick={() => {
                        handleRoleSelect("SocioSinReprocan");
                        handleLogin();
                      }}
                      color={{
                        background: "transparent",
                        text: "black",
                        border: "2px solid black",
                      }}
                      customClass="hover-change-to-white"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 mb-4">
              <div
                className="card h-100 p-3 border-light shadow-sm"
                style={{ transition: "transform 0.3s", borderRadius: "10px" }}
              >
                <div className="card-body">
                  <i
                    className="fas fa-user-md fa-2x mb-3"
                    style={{ color: "#0a9d6d" }}
                  ></i>
                  <h5
                    className="card-title"
                    style={{ fontWeight: "bold", color: "#0a9d6d" }}
                  >
                    Socio Adherente (con Reprocan)
                  </h5>
                  <p className="card-text text-muted">
                    Con beneficios adicionales y prioridad en el acceso a
                    información y eventos.
                  </p>
                  <div className="text-center mt-5 btn-asociarte-custom_2">
                    <ButtonComponent
                      text="Con Reprocan"
                      onClick={() => {
                        handleRoleSelect("SocioConReprocan");
                        handleLogin();
                      }}
                      color={{
                        background: "transparent",
                        text: "black",
                        border: "2px solid black",
                      }}
                      customClass="hover-change-to-white"
                    />
                  </div>
                </div>
              </div>
            </div>
            <GestionarReprocan />
            <h1 className="mt-5">Nuestros convenios</h1>
            <div>
              <MovingBanner logos={logos} />
            </div>
          </div>

          <div className="content-summary">
            <details className="toggleFaqs_faqsQuestions mt-1">
              <summary className="toggleFaqs_faqsQuestions__RozJk">
                ¿Qué es una asociación civil de cannabis?
                <span className="toggleFaqs_faqsQuestions__arrow">➔</span>
              </summary>
              <p className="summary-p">
                Una asociación civil de cannabis es una organización sin fines
                de lucro que promueve la investigación, educación y el uso
                responsable de la planta de cannabis, tanto para fines
                medicinales como recreativos, según las normativas locales.
              </p>
            </details>

            <details className="toggleFaqs_faqsQuestions">
              <summary className="toggleFaqs_faqsQuestions__RozJk">
                ¿Cómo puedo asociarme a una asociación civil de cannabis?
                <span className="toggleFaqs_faqsQuestions__arrow">➔</span>
              </summary>
              <p className="summary-p">
                Para asociarte, generalmente debes ser mayor de edad, presentar
                ciertos documentos como tu identificación y completar un
                formulario de solicitud. Cada asociación tiene sus propios
                requisitos específicos, por lo que es recomendable contactarlos
                directamente.
              </p>
            </details>

            <details className="toggleFaqs_faqsQuestions">
              <summary className="toggleFaqs_faqsQuestions__RozJk">
                ¿Cuáles son los beneficios de ser miembro de una asociación
                civil de cannabis?
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
                cannabis. En muchos lugares, es legal formar asociaciones
                civiles con el objetivo de promover el uso medicinal del
                cannabis, pero en otros lugares aún puede ser ilegal.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
