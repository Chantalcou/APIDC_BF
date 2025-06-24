import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section footer-info">
        <p>© 1995–2025 Tu Empresa. 30 años de trayectoria. Todos los derechos reservados.</p>
      </div>

      <div className="footer-section footer-links-social">
        <div className="footer-links">
          <Link to="/contacto" className="nav-link">
            Contacto
          </Link>
          <Link to="/termsAndPrivacy" className="nav-link">
            Política de Privacidad
          </Link>
        </div>

        <div className="footer-social">
          <a
            href="https://www.instagram.com/apidc.ong/"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-link"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              className="footer-icon"
            />
          </a>
        </div>
      </div>

      <div className="footer-signature">
      <p>Desarrollado por Chantal Denise Coutenceau · Full Stack Developer</p>

      </div>
    </div>
  </footer>
);

export default Footer;
