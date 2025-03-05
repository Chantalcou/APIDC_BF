import React, { useState } from "react";
import { FiDroplet, FiPackage } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/actions/index";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Nav } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import LoginModal from "./LoginModal"; // Asegúrate de importar el modal de login
import "./SeccionAs.css";

const SeccionAs = () => {
  const dispatch = useDispatch();
  const handleShowModal = () => setShowModal(true);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const { userFromRedux, memberShipType, isAdmin, userAdmin, users } =
    useSelector((state) => state);

  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  // Maneja la verificación del CAPTCHA
  const handleCaptchaVerify = (value) => {
    if (value) {
      setCaptchaVerified(true);
      setShowCaptcha(false); // Cierra el modal de CAPTCHA al verificar
    }
  };
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

  return (
    <div className="associate-section">
      {/* Video de fondo */}
      <video autoPlay muted loop className="bg-video_seccion">
        <source
          src="https://res.cloudinary.com/dqgjcfosx/video/upload/v1726834753/7667101-uhd_3840_2160_30fps_tpxp07.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Contenido */}
      <div className="associate-content">
        <h2 className="associate-title_seccion">ASOCIATE</h2>
        <div className="associate-container">
          <div className="associate-card">
            <img
              src="https://mamacultivaargentina.org/wp-content/uploads/2024/10/1Recurso-2logo-mca-final.png"
              alt="icon-aceite"
            ></img>
            <h3 className="associate-title-card">¡QUIERO ACEITE!</h3>
            <p className="associate-text">
              🌱 Tu bienestar comienza con una gota - Descubrí el camino
            </p>

            <Link
              to="/shop"
              className="btn-asociate-custom"
              aria-label="Explorar Membresías"
            >
              Tienda
              <FaArrowRight className="btn-icon" />
            </Link>
          </div>

          <div className="associate-card">
            <img
              src="https://mamacultivaargentina.org/wp-content/uploads/2024/10/1Recurso-1logo-mca-final.png"
              alt="Icon-flores"
            ></img>
            <h3 className="associate-title-card">ASOCIATE</h3>
            <p className="associate-text">
              🌿 Accedé al cannabis medicinal de forma segura y legal con
              Reprocann.
            </p>
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
              <Link
                className="btn-asociate-custom"
                aria-label="Explorar Membresías"
                onClick={handleShowModal || handleLogin}
              >
                Iniciar sesión
                <FaArrowRight className="btn-icon" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mostrar Modal de CAPTCHA si aún no está verificado */}
      {showCaptcha && (
        <div className="captcha-modal">
          {/* Tu implementación del CAPTCHA aquí */}
          {/* Usa algún componente como reCAPTCHA de Google para la verificación */}
        </div>
      )}

      {/* Modal de login */}
      <LoginModal show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
};

export default SeccionAs;
