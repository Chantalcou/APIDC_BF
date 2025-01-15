import React from "react";
import "./Footer.css";

const Footer = () => (
  <>
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p>© 2024 Tu Empresa. Todos los derechos reservados.</p>
        </div>
        <div className="footer-section">
          <a href="mailto:contacto@tuempresa.com">Contacto</a> |
          <a href="/privacy-policy">Política de Privacidad</a> |
          <a href="/terms-of-service">Términos de Servicio</a>
        </div>
        <div className="footer-section">
          {/* Íconos de redes sociales */}
          {[
            {
              href: "https://facebook.com",
              src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
              alt: "Facebook",
            },
            {
              href: "https://twitter.com",
              src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1736352651/vecteezy_twitter-brand-new-logo-3-d-with-new-x-shaped-graphic-of-the_27395710_nmjyj4.png",
              alt: "X (Twitter)",
            },
            {
              href: "https://instagram.com",
              src: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
              alt: "Instagram",
            },
          ].map(({ href, src, alt }, index) => (
            <React.Fragment key={alt}>
              {index > 0 && " | "}
              <a href={href} target="_blank" rel="noopener noreferrer">
                <img src={src} alt={alt} className="footer-icon" />
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>

    {/* Sentinel debe estar siempre fuera de cualquier componente que cambie su layout */}
    <div id="sentinel" style={{ height: "1px" }}></div>
  </>
);

export default Footer;
