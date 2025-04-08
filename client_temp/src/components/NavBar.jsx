import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  fetchUsers,
  getAllNotAdmins,
} from "../redux/actions/index";
import BreadCrumRoutes from "./BreadCrumbRoutes";
import ProductsSection from "./ProductsSection";
import LoginModal from "./LoginModal";
import $ from "jquery";
import io from "socket.io-client";
import ReCAPTCHA from "react-google-recaptcha";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    userFromRedux,
    memberShipType,
    isAdmin,
    getAllNotAdmin,
    userAdmin,
    isSocioVerified,
  } = useSelector((state) => state);

  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);
  // Estado del modal
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  useEffect(() => {
    const loadUsers = async () => {
      try {
        await dispatch(getAllNotAdmins()); // Pasa el token a fetchUsers
      } catch (err) {
        console.log("Error cargando usuarios");
      }
    };
    loadUsers();
  }, [dispatch, getAccessTokenSilently]);

  // Actualizar el efecto de registro de usuario
  useEffect(() => {
    const registerAuthenticatedUser = async () => {
      if (isAuthenticated && user) {
        try {
          const idTokenObject = JSON.parse(localStorage.getItem("@@auth0spajs@@::8KX5NG5JLM5pdOJYuYkFZTRGtOs53t2v::@@user@@"));
          // console.log(idTokenObject); // Esto te mostrará el objeto completo
          
          // Ahora puedes acceder a las propiedades del objeto
          const idToken = idTokenObject.id_token;
          // console.log(idToken); 

          if (redirectPath) {
            // Si la ruta es para /membershipSection, redirigir inmediatamente
            if (redirectPath === "/membershipSection") {
              navigate(redirectPath);
            } else {
              navigate(redirectPath);
            }
            setRedirectPath(null); // Limpiar la ruta después de la redirección
          }
        } catch (error) {
          console.error("Error registrando usuario:", error);
        }
      }
    };

    registerAuthenticatedUser();
  }, [
    isAuthenticated,
    user,
    getAccessTokenSilently,
    dispatch,
    redirectPath,
    navigate,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsScrolling(
        currentScrollPos > 50 ? scrollPosition < currentScrollPos : false
      );
      setScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  // Verification Captcha
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=6Lc8vrMqAAAAAPXaohW4mzMVw401_H9KGEZGt57I`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const scrollToSection = (sectionId) => {
    $("html, body").animate(
      {
        scrollTop: $("#" + sectionId).offset().top,
      },
      1000
    );
  };

  const isHome = location.pathname === "/";
  // Maneja la verificación de reCAPTCHA
  const handleCaptchaVerify = (value) => {
    if (value) {
      setCaptchaVerified(true);
      setShowCaptcha(false);
    } else {
      console.error("Error de verificación del CAPTCHA");
    }
  };
  const handleSocioRedirect = () => {
    if (!isAuthenticated) {
      setRedirectPath("/socio"); // Guardar la ruta destino
      handleShowModal();
    } else {
      navigate("/socio");
    }
  };

  const handleCaptchaClose = () => {
    setShowCaptcha(false);
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "reduxState") {
        const newState = JSON.parse(e.newValue);
        dispatch({ type: "REHYDRATE_STATE", payload: newState });
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);

  const handleMembershipRedirect = () => {
    if (!isAuthenticated) {
      // Si no está autenticado, redirigir al login
      setRedirectPath("/login");
      handleShowModal();
    } else {
      // Si está autenticado, verificamos el tipo de membresía
      const userMembership = getAllNotAdmin?.find(
        (u) => u.email?.toLowerCase() === user?.email?.toLowerCase()
      )?.membershipType;

      if (userMembership && ["gestor", "premium"].includes(userMembership)) {
        // Si tiene un tipo de membresía válido, redirigir a la sección de membresía
        navigate("/membershipSection");
      } else {
        // Si no tiene una membresía válida, mostrar mensaje o redirigir a una página diferente
        alert("No tienes acceso a la sección de membresía.");
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated && redirectPath) {
      navigate(redirectPath);
      setRedirectPath(null);
    }
  }, [isAuthenticated, redirectPath, navigate]);

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className={`navbar-container ${
          isScrolling ? "scroll-hide" : "scroll-show"
        }`}
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="/">
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
              <Nav.Link href="/">Inicio</Nav.Link>
              {isAuthenticated ? (
                <>
                  {isAuthenticated &&
                    getAllNotAdmin?.some(
                      (u) =>
                        u.email?.toLowerCase() === user?.email?.toLowerCase() &&
                        ["gestor", "premium"].includes(u.membershipType)
                    ) && (
                      <Link to="/products" className="nav-link me-3">
                        Tu Cultivo
                      </Link>
                    )}
                  {isAuthenticated &&
                    getAllNotAdmin?.some(
                      (u) =>
                        u.email?.toLowerCase() === user?.email?.toLowerCase() &&
                        ["gestor", "premium"].includes(u.membershipType)
                    ) && (
                      <Link to="/newsLetter" className="nav-link me-3">
                        NesLetter
                      </Link>
                    )}
                </>
              ) : (
                <></>
              )}
              {isHome && (
                <Nav.Link onClick={() => scrollToSection("about-section")}>
                  Nosotros
                </Nav.Link>
              )}
              {isHome && (
                <Nav.Link onClick={handleMembershipRedirect}>Asociate</Nav.Link>
              )}

              {isHome && (
                <Nav.Link
                  onClick={() => scrollToSection("donate-now")}
                  className="nav-link_dona"
                >
                  Dona ahora
                </Nav.Link>
              )}

              <Link to="/shop" className="nav-link">
                Tienda
              </Link>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse id="basic-navbar-nav-autentication">
            <Nav className="basic-navbar-nav-autentication-2">
              {isAuthenticated && user ? (
                <>
                  {/* Dashboard para admins */}
                  {isAdmin && (
                    <Link to="/dashboard" className="nav-link me-3">
                      Dashboard
                    </Link>
                  )}

                  {/* Perfil del usuario */}
                  <Nav.Link className="d-flex align-items-center me-3">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="profile-picture me-2"
                    />
                    <span>{userFromRedux?.name || user?.name}</span>
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={handleShowModal}>Iniciar sesión</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Modal para mostrar el reCAPTCHA */}
      {/* {showCaptcha && (
        <div className="captcha-modal">
          <div className="modal-content">
            <h2>Verificación CAPTCHA</h2>
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} // Usa la clave del .env
              onChange={handleCaptchaVerify} // Maneja la verificación
            />
            <button onClick={handleCaptchaClose}>Cerrar</button>
          </div>
        </div>
      )} */}

      <div
        className={`breadcrumbs ${isScrolling ? "scroll-hide" : "scroll-show"}`}
      >
        <Container>
          <BreadCrumRoutes />
        </Container>
      </div>
      <LoginModal show={showModal} handleClose={handleCloseModal} />
    </>
  );
};

export default NavBar;
