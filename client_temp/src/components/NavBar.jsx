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

  const { userFromRedux, memberShipType, isAdmin, userAdmin } = useSelector(
    (state) => state
  );

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
          localStorage.setItem("authToken", token); // Guardar el token
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

  const handleLogin = async () => {
    if (!captchaVerified) {
      setShowCaptcha(true);
      return;
    }

    try {
      await loginWithRedirect();

      if (isAuthenticated && user) {
        let token = localStorage.getItem("authToken");
        if (!token) {
          token = await getAccessTokenSilently();
          localStorage.setItem("authToken", token);
        }
        dispatch(registerUser(user, token));
      }
    } catch (error) {
      console.error("Error durante el login o el registro:", error);
    }
  };

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

  // const shouldShowAsociate = ![
  //   "/gestor",
  //   "/SocioSinReprocan",
  //   "/SocioConReprocan",
  // ].includes(location.pathname);
  const isHome = location.pathname === "/";
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

  useEffect(() => {
    console.log("Tipo de membresía actualizado:", memberShipType);
  }, [memberShipType]);
  console.log(memberShipType, "MEMBRESIA");
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
            <Nav className="basic-navbar-nav-autentication-left">
              <Nav.Link href="/">Inicio</Nav.Link>
              {/* Mostrar Productos solo si el rol NO es 'sinMembresia' */}
              {isAuthenticated &&
                (memberShipType === "premium" || memberShipType === "gestor" ? (
                  <li>
                    <Link to="/products" className="nav-link">
                      Productos
                    </Link>
                  </li>
                ) : null) // Si no tiene membresía premium ni gestor, no se muestra el link
              }

              {isHome && (
                <Nav.Link onClick={() => scrollToSection("about-section")}>
                  Nosotros
                </Nav.Link>
              )}
              {isHome && (
                <Nav.Link onClick={() => scrollToSection("asociarme-section")}>
                  Asociate
                </Nav.Link>
              )}
              {isHome && (
                <Nav.Link onClick={() => scrollToSection("work-together")}>
                  Trabaja con nosotros
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse id="basic-navbar-nav-autentication">
            <Nav className="basic-navbar-nav-autentication-2">
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
