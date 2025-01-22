import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, fetchUsers } from "../redux/actions/index";
import BreadCrumRoutes from "./BreadCrumbRoutes";
import ProductsSection from "./ProductsSection";
import LoginModal from "./LoginModal";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userAdmin = useSelector((state) => state.userAdmin);
  const isAdmin = useSelector((state) => state.isAdmin);
  const userFromRedux = useSelector((state) => state.user);

  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false); // Estado para mostrar u ocultar el modal de CAPTCHA
  const [captchaVerified, setCaptchaVerified] = useState(false); // Estado para verificar el CAPTCHA

  // Estado del modal
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          console.log("Token generado:", token);
          dispatch(registerUser(user, token)); // Despacha la acción de registro
          console.log(user, "IS ADMIN"); // Usar directamente el valor de user.isAdmin

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

  // const handleLogin = async () => {
  //   if (!captchaVerified) {
  //     setShowCaptcha(true);
  //     return;
  //   }

  //   try {
  //     await loginWithRedirect();

  //     if (isAuthenticated && user) {
  //       const token = await getAccessTokenSilently();
  //       dispatch(registerUser(user, token));
  //     }
  //   } catch (error) {
  //     console.error("Error durante el login o el registro:", error);
  //   }
  // };
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

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
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

  const shouldShowAsociate = ![
    "/gestor",
    "/SocioSinReprocan",
    "/SocioConReprocan",
  ].includes(location.pathname);

  // Maneja la verificación de reCAPTCHA
  const handleCaptchaVerify = (value) => {
    if (value) {
      setCaptchaVerified(true);
      setShowCaptcha(false); // Cierra el modal al verificar
    }
  };

  const handleCaptchaClose = () => {
    setShowCaptcha(false); // Cierra el modal sin verificar
  };

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
              src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1725976604/APIDC-LOGO-01-121x121_qnzw4d.png"
              alt="Logo"
              width="60"
              height="60"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link href="/">Inicio</Nav.Link>
              {shouldShowAsociate && (
                <Nav.Link onClick={() => scrollToSection("about-section")}>
                  Nosotros
                </Nav.Link>
              )}
              {shouldShowAsociate && (
                <Nav.Link onClick={() => scrollToSection("asociarme-section")}>
                  Asociate
                </Nav.Link>
              )}
              {isAuthenticated && user ? (
                <>
                  {/* <Nav.Link href="/products">Productos</Nav.Link> */}
                  <Nav.Link href="#" className="d-flex align-items-center">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="profile-picture me-2"
                    />
                    <span className="user-name">
                      {userFromRedux?.name || user?.name}
                    </span>
                  </Nav.Link>
                  
                  {isAuthenticated && user && isAdmin && (
                    <Link to="/dashboard" className="nav-link">
                      Dashboard
                    </Link>
                  )}

                  <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={handleShowModal || handleLogin}>
                  Iniciar sesión
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
