import React, { useEffect, useRef, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifySocio } from "../redux/actions";
import BreadCrumbRoutes from "./BreadCrumbRoutes";
import NonSocioModal from "./NonSocioModal";
import LoginModal from "./LoginModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { userFromRedux, isAdmin } = useSelector((state) => state);

  const { isAuthenticated, isLoading, logout, user } = useAuth0();

  const [isScrolling, setIsScrolling] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isCheckingSocio, setIsCheckingSocio] = useState(false);
  const [showNonSocioModal, setShowNonSocioModal] = useState(false);

  const lastScrollY = useRef(0);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  /* =========================================================
     SCROLL NAVBAR
  ========================================================= */

  useEffect(() => {
    lastScrollY.current = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;

      if (currentScrollY <= 60) {
        setIsScrolling(false);
      } else {
        setIsScrolling(currentScrollY > lastScrollY.current);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================================
     SINCRONIZACIÓN REDUX ENTRE PESTAÑAS
  ========================================================= */

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "reduxState" && event.newValue) {
        try {
          const newState = JSON.parse(event.newValue);

          dispatch({
            type: "REHYDRATE_STATE",
            payload: newState,
          });
        } catch (storageError) {
          console.error(
            "Error rehidratando estado:",
            storageError
          );
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  /* =========================================================
     SCROLL A SECCIONES DEL HOME
  ========================================================= */

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const isHome = location.pathname === "/";

  /* =========================================================
     SESIÓN SOCIO
  ========================================================= */

  const clearSocioSession = () => {
    localStorage.removeItem("socioAuthorized");
    localStorage.removeItem("postLoginRedirect");
    localStorage.removeItem("isSocioVerified");
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdmin");

    clearSocioSession();

    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  /* =========================================================
     VERIFICACIÓN DE SOCIO
  ========================================================= */

  const runSocioVerification = async (redirectTo) => {
    if (!user?.email) {
      alert(
        "No se pudo obtener el email del usuario autenticado."
      );
      return;
    }

    try {
      setIsCheckingSocio(true);

      const result = await dispatch(
        verifySocio(user.email)
      );

      if (result?.success) {
        localStorage.setItem(
          "socioAuthorized",
          "true"
        );

        localStorage.setItem(
          "isSocioVerified",
          "true"
        );

        navigate(redirectTo);
      } else {
        clearSocioSession();
        setShowNonSocioModal(true);
      }
    } catch (verifyError) {
      console.error(
        "Error verificando socio:",
        verifyError
      );

      clearSocioSession();

      alert(
        "Ocurrió un error al verificar el acceso del socio."
      );

      navigate("/");
    } finally {
      setIsCheckingSocio(false);
      localStorage.removeItem("postLoginRedirect");
    }
  };

  /* =========================================================
     MI ESPACIO SOCIO
  ========================================================= */

  const handleSocioRedirect = () => {
    if (isLoading || isCheckingSocio) return;

    if (!isAuthenticated) {
      localStorage.setItem(
        "postLoginRedirect",
        "/geneticas-disponibles"
      );

      handleShowModal();
      return;
    }

    runSocioVerification(
      "/geneticas-disponibles"
    );
  };

  /* =========================================================
     ASOCIARSE
  ========================================================= */

  const handleMembershipRedirect = () => {
    if (isLoading || isCheckingSocio) return;

    if (!isAuthenticated) {
      localStorage.setItem(
        "postLoginRedirect",
        "/membershipSection"
      );

      handleShowModal();
      return;
    }

    runSocioVerification("/membershipSection");
  };

  /* =========================================================
     REDIRECT DESPUÉS DEL LOGIN
  ========================================================= */

  useEffect(() => {
    if (
      isLoading ||
      !isAuthenticated ||
      !user?.email
    ) {
      return;
    }

    const postLoginRedirect =
      localStorage.getItem(
        "postLoginRedirect"
      );

    if (!postLoginRedirect) return;

    runSocioVerification(postLoginRedirect);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isAuthenticated,
    isLoading,
    user?.email,
  ]);

  /* =========================================================
     MODAL NO SOCIO
  ========================================================= */

  const handleAsociarme = () => {
    setShowNonSocioModal(false);
    navigate("/membershipSection");
  };

  const handleCloseNonSocioModal = () => {
    setShowNonSocioModal(false);
  };

  /* =========================================================
     DATOS DEL USUARIO
  ========================================================= */

  const displayName =
    userFromRedux?.name ||
    user?.name ||
    user?.nickname ||
    user?.email ||
    "Usuario";

  const getInitials = (name = "") => {
    const parts = name
      .trim()
      .split(" ")
      .filter(Boolean);

    if (parts.length === 0) return "AP";

    if (parts.length === 1) {
      return parts[0]
        .substring(0, 2)
        .toUpperCase();
    }

    return (
      parts[0][0] +
      parts[parts.length - 1][0]
    ).toUpperCase();
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <Navbar
        expand="xl"
        fixed="top"
        className={`apidc-navbar apidc-navbar-shell ${
          isScrolling
            ? "scroll-hide"
            : "scroll-show"
        }`}
      >
        <Container
          fluid
          className="apidc-navbar-wrapper"
        >
          {/* ==========================
              LOGO
          ========================== */}

          <Navbar.Brand
            as={Link}
            to="/"
            className="apidc-brand"
            aria-label="Ir al inicio de APIDC"
          >
            <div className="apidc-logo-box">
              <img
                src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1725973641/apidc-logo_hz26kf.png"
                alt="APIDC"
                className="apidc-logo"
              />
            </div>
          </Navbar.Brand>

          {/* ==========================
              TOGGLER MOBILE
          ========================== */}

          <Navbar.Toggle
            aria-controls="apidc-navbar-menu"
            className="apidc-toggler"
          />

          <Navbar.Collapse
            id="apidc-navbar-menu"
            className="apidc-navbar-collapse"
          >
            {/* ==========================
                NAVEGACIÓN
            ========================== */}

            <Nav className="apidc-main-nav">
              <Link
                to="/"
                className={`apidc-menu-link link-inicio ${
                  location.pathname === "/"
                    ? "active"
                    : ""
                }`}
              >
                Inicio
              </Link>

              {isHome && (
                <button
                  type="button"
                  onClick={() =>
                    scrollToSection(
                      "about-section"
                    )
                  }
                  className="apidc-menu-link link-nosotros"
                >
                  Nosotros
                </button>
              )}

              {isHome && (
                <button
                  type="button"
                  onClick={
                    handleMembershipRedirect
                  }
                  className="apidc-menu-link link-asociate"
                >
                  Asociate
                </button>
              )}

              {isHome && (
                <button
                  type="button"
                  onClick={() =>
                    scrollToSection(
                      "donate-now"
                    )
                  }
                  className="apidc-menu-link link-dona"
                >
                  <span className="apidc-donate-heart">
                    ♥
                  </span>
                  Doná
                </button>
              )}

              <Link
                to="/gallery"
                className={`apidc-menu-link link-galeria ${
                  location.pathname ===
                  "/gallery"
                    ? "active"
                    : ""
                }`}
              >
                Galería
              </Link>

              <Link
                to="/investigacion-y-desarrollo"
                className={`apidc-menu-link link-investigacion ${
                  location.pathname ===
                  "/investigacion-y-desarrollo"
                    ? "active"
                    : ""
                }`}
              >
                Investigación y Desarrollo
              </Link>

              <Link
                to="/learnWithUs"
                className={`apidc-menu-link link-aprende ${
                  location.pathname ===
                  "/learnWithUs"
                    ? "active"
                    : ""
                }`}
              >
                Aprendé con Nosotros
              </Link>
            </Nav>

            {/* ==========================
                CUENTA / USUARIO
            ========================== */}

            <div className="apidc-account-area">
              {isAuthenticated && user ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/dashboard"
                      className="apidc-dashboard-btn"
                    >
                      Dashboard
                    </Link>
                  )}

                  <div className="apidc-profile">
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt=""
                        className="apidc-profile-img"
                      />
                    ) : (
                      <div className="apidc-profile-fallback">
                        {getInitials(
                          displayName
                        )}
                      </div>
                    )}

                    <div className="apidc-profile-copy">
                      <span className="apidc-profile-label">
                        Bienvenido/a
                      </span>

                      <span
                        className="apidc-profile-name"
                        title={displayName}
                      >
                        {displayName}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSocioRedirect}
                    disabled={
                      isLoading ||
                      isCheckingSocio
                    }
                    className="apidc-socio-btn"
                  >
                    {isCheckingSocio
                      ? "Verificando..."
                      : "Mi espacio socio"}
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="apidc-logout-btn"
                  >
                    Salir
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleSocioRedirect}
                  disabled={
                    isLoading ||
                    isCheckingSocio
                  }
                  className="apidc-socio-btn"
                >
                  {isLoading
                    ? "Cargando..."
                    : "Soy socio/a"}
                </button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>

        {/* ==========================
            LÍNEA DE COLOR
        ========================== */}

        <div
          className="apidc-navbar-line"
          aria-hidden="true"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Navbar>

      {/* ==========================
          BREADCRUMB
      ========================== */}

      <div
        className={`breadcrumbs ${
          isScrolling
            ? "scroll-hide"
            : "scroll-show"
        }`}
      >
        <Container fluid>
          <BreadCrumbRoutes />
        </Container>
      </div>

      {/* ==========================
          MODALES
      ========================== */}

      <LoginModal
        show={showModal}
        handleClose={handleCloseModal}
      />

      <NonSocioModal
        show={showNonSocioModal}
        onClose={handleCloseNonSocioModal}
        onAsociarme={handleAsociarme}
        qrImageUrl="https://res.cloudinary.com/dqgjcfosx/image/upload/v1773841222/frame_17_g7dkcv.png"
      />
    </>
  );
};

export default NavBar;