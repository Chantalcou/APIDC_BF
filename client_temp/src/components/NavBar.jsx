import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifySocio } from "../redux/actions";
import BreadCrumbRoutes from "./BreadCrumbRoutes";
import NonSocioModal from "./NonSocioModal";   
import LoginModal from "./LoginModal";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { userFromRedux, isAdmin, isSocioVerified, error } = useSelector((state) => state);
  const { isAuthenticated, isLoading, logout, user } = useAuth0();
  
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isCheckingSocio, setIsCheckingSocio] = useState(false);
  const [showNonSocioModal, setShowNonSocioModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsScrolling(currentScrollPos > 50 ? scrollPosition < currentScrollPos : false);
      setScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "reduxState" && e.newValue) {
        try {
          const newState = JSON.parse(e.newValue);
          dispatch({ type: "REHYDRATE_STATE", payload: newState });
        } catch (storageError) {
          console.error("Error rehidratando estado:", storageError);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);

  const scrollToSection = (sectionId) => {
    const section = $("#" + sectionId);
    if (section.length) {
      $("html, body").animate({ scrollTop: section.offset().top }, 1000);
    }
  };

  const isHome = location.pathname === "/";

  const clearSocioSession = () => {
    localStorage.removeItem("socioAuthorized");
    localStorage.removeItem("postLoginRedirect");
    localStorage.removeItem("isSocioVerified");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdmin");
    clearSocioSession();

    logout({
      logoutParams: { returnTo: window.location.origin },
    });
  };

  const runSocioVerification = async (redirectTo) => {
  if (!user?.email) {
    alert("No se pudo obtener el email del usuario autenticado.");
    return;
  }

  try {
    setIsCheckingSocio(true);
    const result = await dispatch(verifySocio(user.email));

    if (result?.success) {
      localStorage.setItem("socioAuthorized", "true");
      localStorage.setItem("isSocioVerified", "true");
      navigate(redirectTo);
    } else {
      clearSocioSession();
      // Mostrar modal de no socio en lugar de alert
      setShowNonSocioModal(true);
      // No navegamos, solo mostramos el modal
    }
  } catch (verifyError) {
    console.error("Error verificando socio:", verifyError);
    clearSocioSession();
    alert("Ocurrió un error al verificar el acceso del socio.");
    navigate("/");
  } finally {
    setIsCheckingSocio(false);
    localStorage.removeItem("postLoginRedirect");
  }
};

  const handleSocioRedirect = () => {
    if (isLoading || isCheckingSocio) return;

    if (!isAuthenticated) {
      localStorage.setItem("postLoginRedirect", "/geneticas-disponibles");
      handleShowModal();
      return;
    }

    runSocioVerification("/geneticas-disponibles");
  };

  const handleMembershipRedirect = () => {
    if (isLoading || isCheckingSocio) return;

    if (!isAuthenticated) {
      localStorage.setItem("postLoginRedirect", "/membershipSection");
      handleShowModal();
      return;
    }

    runSocioVerification("/membershipSection");
  };

  useEffect(() => {
    if (isLoading || !isAuthenticated || !user?.email) return;

    const postLoginRedirect = localStorage.getItem("postLoginRedirect");
    if (!postLoginRedirect) return;

    runSocioVerification(postLoginRedirect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading, user?.email]);

  const handleAsociarme = () => {
  setShowNonSocioModal(false);
  // Redirige directamente a la sección de membresía (sin verificar socio nuevamente)
  navigate("/membershipSection");
};

const handleCloseNonSocioModal = () => {
  setShowNonSocioModal(false);
  // Permanece en la página actual
};

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className={`navbar-container ${isScrolling ? "scroll-hide" : "scroll-show"}`}
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1725973641/apidc-logo_hz26kf.png"
              alt="Logo"
              width="60"
              height="60"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="basic-navbar-nav-autentication-left">
              <Nav.Link as={Link} to="/">
                Inicio
              </Nav.Link>

              {isAuthenticated && localStorage.getItem("socioAuthorized") === "true" && (
                <Link to="/products" className="nav-link me-3">
                  Tu Cultivo
                </Link>
              )}

              {isHome && (
                <Nav.Link onClick={() => scrollToSection("about-section")}>
                  Nosotros
                </Nav.Link>
              )}

              {isHome && (
                <Nav.Link onClick={handleMembershipRedirect}>
                  Asociate
                </Nav.Link>
              )}

              {isHome && (
                <Nav.Link
                  onClick={() => scrollToSection("donate-now")}
                  className="nav-link_dona"
                >
                  Doná ahora
                </Nav.Link>
              )}

              <Link to="/gallery" className="nav-link">
                Galería
              </Link>

              <Link to="/learnWithUs" className="nav-link">
                Aprendé con Nosotros
              </Link>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse id="basic-navbar-nav-autentication">
            <Nav className="basic-navbar-nav-autentication-2">
              {isAuthenticated && user ? (
                <>
                  {isAdmin && (
                    <Link to="/dashboard" className="nav-link me-3">
                      Dashboard
                    </Link>
                  )}

                  <Nav.Link className="d-flex align-items-center me-3">
                    {user.picture && (
                      <img
                        src={user.picture}
                        alt="Profile"
                        className="profile-picture me-2"
                      />
                    )}
                    <span>{userFromRedux?.name || user?.name || user?.email}</span>
                  </Nav.Link>

                  <Nav.Link onClick={handleSocioRedirect}>
                    Mi espacio socio
                  </Nav.Link>

                  <Nav.Link onClick={handleLogout}>
                    Cerrar sesión
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={handleSocioRedirect}>
                  Soy socio/a
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className={`breadcrumbs ${isScrolling ? "scroll-hide" : "scroll-show"}`}>
        <Container>
          <BreadCrumbRoutes />
        </Container>
      </div>

      <LoginModal show={showModal} handleClose={handleCloseModal} />
      <NonSocioModal
  show={showNonSocioModal}
  onClose={handleCloseNonSocioModal}
  onAsociarme={handleAsociarme}
  qrImageUrl="https://res.cloudinary.com/dqgjcfosx/image/upload/v1773841222/frame_17_g7dkcv.png"/>
    </>
  );
};

export default NavBar;