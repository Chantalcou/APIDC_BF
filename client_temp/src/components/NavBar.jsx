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
          const token = await getAccessTokenSilently();
          localStorage.setItem("authToken", token);
          await dispatch(registerUser(user, token));

          // Redirigir después de registrar al usuario
          if (redirectPath) {
            navigate(redirectPath);
            setRedirectPath(null);
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
    script.src = `https://www.google.com/recaptcha/api.js?render=6LdEf-oqAAAAAIYnr9wd78kozSfH4PCl1oJomKCX`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // const handleLogin = async () => {
  //   try {
  //     // Primero resolver la autenticación
  //     await loginWithRedirect({
  //       authorizationParams: {
  //         redirect_uri: `${window.location.origin}${redirectPath || "/"}`,
  //       },
  //     });

  //     // Cerrar modal después de autenticar
  //     handleCloseModal();
  //   } catch (error) {
  //     console.error("Error durante el login:", error);
  //   }
  // };
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
    setShowCaptcha(false); // Cierra el modal sin verificar
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

  // const showProductsLink =
  //   isAuthenticated &&
  //   userFromRedux?.membershipType &&
  //   (userFromRedux.membershipType === "premium" ||
  //     userFromRedux.membershipType === "gestor");
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   // Crear la conexión de Socket.IO una sola vez
  //   const newSocket = io("http://localhost:5001");
  //   setSocket(newSocket);

  //   // Escuchar eventos de Socket.IO
  //   newSocket.on("user_updated", (data) => {
  //     console.log("Datos del usuario actualizados:", data);
  //   });

  //   // Limpiar la conexión al desmontar el componente
  //   return () => newSocket.disconnect();
  // }, []);

  // const pruebadeSockerFunction = () => {
  //   if (socket) {
  //     // Emitir un evento de prueba al servidor
  //     socket.emit("prueba_evento", { message: "Hola desde el cliente" });
  //   } else {
  //     console.error("Socket no está conectado");
  //   }
  // };

  const prueba = () => {
    // Supongamos que 'user' es el objeto del usuario de Auth0
    // y 'getAllNotAdmin' es el arreglo con usuarios obtenidos del backend.
    if (!user || !getAllNotAdmin || !Array.isArray(getAllNotAdmin)) {
      console.log("Faltan datos o getAllNotAdmin no es un array");
      return;
    }
    const userEmail = user.email.toLowerCase();
    // Buscar en el arreglo un usuario cuyo email coincida
    const matchedUser = getAllNotAdmin.find(
      (el) => el.email && el.email.toLowerCase() === userEmail
    );

    if (matchedUser) {
      // Si se encuentra, obtenemos el membershipType
      const membership = matchedUser.membershipType;
      if (["gestor", "premium"].includes(membership)) {
        const meberShipTypeProducts = membership;
      } else {
        console.log("El usuario es sinMembresia");
      }
    } else {
      console.log("No se encontró coincidencia para el email:", user.email);
    }

    console.log("USER:", user);
    console.log("GET NOT ADMIN:", getAllNotAdmin);
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
                  {/* Enlace a Socio (siempre visible para autenticados) */}
                  {/* <Nav.Link onClick={handleSocioRedirect}>Soy socio</Nav.Link> */}
                  {/* Enlace a Productos (solo para socios verificados) */}
                  {/* {isSocioVerified && (
                    <Link to="/products" className="nav-link me-3">
                      Productos
                    </Link>
                  )}
                 */}
                  {isAuthenticated &&
                    getAllNotAdmin?.some(
                      (u) =>
                        u.email?.toLowerCase() === user?.email?.toLowerCase() &&
                        ["gestor", "premium"].includes(u.membershipType)
                    ) && (
                      <Link to="/products" className="nav-link me-3">
                        Productos
                      </Link>
                    )}
                </>
              ) : (
                // Sección para no autenticados
                <>
       
                </>
              )}
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
              <Link to="/" className="nav-link_dona">
                Dona ahora
              </Link>
              {/* {isHome && (
                <Nav.Link onClick={() => scrollToSection("work-together")}>
                  Trabaja con nosotros
                </Nav.Link>
              )} */}
              <Link to="/shop" className="nav-link">
                Tienda
              </Link>
            </Nav>
            {/* <button
              onClick={() => console.log(userFromRedux, "QUE ME LLEGA A VER")}
            >
              BOTONNN
            </button> */}
          </Navbar.Collapse>
          {/* 
          <button onClick={() => console.log(users, userFromRedux)}>
            TIPO MEMBRESIA
          </button> */}
          {/* <button onClick={() => pruebadeSockerFunction()}>
            Prueba de Socket
          </button> */}
          <Navbar.Collapse id="basic-navbar-nav-autentication">
            <Nav className="basic-navbar-nav-autentication-2">
              {isAuthenticated && user ? (
                <>
                  {/*                 
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
                  {isSocioVerified && (
                    <Link to="/products" className="nav-link">
                      Productos
                    </Link>
                  )} */}
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
