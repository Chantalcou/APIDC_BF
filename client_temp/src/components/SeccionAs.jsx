import React, { useState } from "react";
import { FiDroplet, FiPackage } from "react-icons/fi";
import { Link } from "react-router-dom";
import { registerUser, fetchUsers } from "../redux/actions/index";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { FaArrowRight } from "react-icons/fa";
import "./SeccionAs.css";

const SeccionAs = () => {
  const dispatch = useDispatch();
  const handleShowModal = () => setShowModal(true);

  const [showModal, setShowModal] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const {
    isAuthenticated,
    loginWithRedirect,
    // logout,
    user,
    getAccessTokenSilently,
  } = useAuth0();

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
            <h3 className="associate-title-card">¡QUIERO FLORES!</h3>
            <p className="associate-text">
              🌿 Accedé de forma segura a tus flores con Reprocann.
              {/* Tus flores legales, a un clic de distancia - ¿List@ para
              empezar? */}
            </p>
            {!isAuthenticated && !user ? (
              <>
                <Link
                  onClick={handleShowModal || handleLogin}
                  className="btn-asociate-custom"
                  aria-label="Explorar Membresías - ESTA AUTENTICADO"
                >
                  Asociate
                  <FaArrowRight className="btn-icon" />
                </Link>
              </>
            ) : (
              <Link
                to="/membershipSection"
                className="btn-asociate-custom"
                aria-label="Explorar Membresías"
              >
               Asociate
                <FaArrowRight className="btn-icon" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeccionAs;
