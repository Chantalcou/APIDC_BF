import React, { useState, useEffect } from "react";
import { FiDroplet, FiPackage } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/actions/index";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Nav } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
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

  const { userFromRedux, isAdmin } = useSelector((state) => state);

  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    // Cargar el script de Google reCAPTCHA dinámicamente
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=6LdEf-oqAAAAAIYnr9wd78kozSfH4PCl1oJomKCX`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
  const handleCaptchaClose = () => {
    setShowCaptcha(false); // Cierra el modal sin verificar
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
            <h3 className="associate-title-card">TIENDA</h3>
            <p className="associate-text">
              🌱 Nuestros productos de la mejor calidad
            </p>

            <Link
              to="/shop"
              className="btn-asociate-custom"
              aria-label="Explorar Membresías"
            >
              Ir
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
                <Link
                  to="/membershipSection"
                  className="btn-asociate-custom"
                  aria-label="Explorar Membresías"
                >
                  Mas
                  <FaArrowRight className="btn-icon" />
                </Link>
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
      {/* Modal para mostrar el reCAPTCHA */}
      {showCaptcha && (
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
      )}

      {/* Modal de login */}
      <LoginModal show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
};

export default SeccionAs;
