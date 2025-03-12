import React, { useState, useEffect } from "react";
import SpinnerComponent from "./SpinnerComponent.jsx";
import "./Newsletter.css";

const Newsletter = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulando una carga de datos por 2 segundos
  }, []);

  return (
    <>
      {loading ? (
        <SpinnerComponent />
      ) : (
        <div className="newsletter-container">
          <header className="newsletter-header">
            {/* Header comentado según tu estructura actual */}
          </header>

          <div className="content">
            <aside className="sidebar">
              <h2>Últimas Noticias sobre Cannabis Medicinal</h2>
              <div className="news-item">
                <img
                  src="https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto/v1736181619/pexels-mdsnmdsnmdsn-3697718_tgaq7k.jpg"
                  alt="Crecimiento industria cannabis medicinal 2025"
                  loading="lazy"
                />
                <div className="news-content">
                  <h3>La Industria del Cannabis Medicinal está Creciendo</h3>
                  <p>
                    Conozca las proyecciones para 2025 y cómo los cambios en la
                    legislación están impactando el mercado...
                  </p>
                </div>
              </div>

              <div className="news-item">
                <img
                  src="https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto/v1736181808/pexels-chokniti-khongchum-1197604-2280551_nw4xe5.jpg"
                  alt="Certificado Reprocan beneficios"
                  loading="lazy"
                />
                <div className="news-content">
                  <h3>Reprocan: Un Certificado para el Futuro</h3>
                  <p>
                    ¿Qué es Reprocan y por qué cada vez más profesionales buscan
                    obtener este certificado?
                  </p>
                </div>
              </div>
            </aside>
         
            <main className="main-content">
              <section className="featured-offers">
                <div className="section-header">
                  <h2 className="section-title">💎 Ofertas Exclusivas</h2>
                  <p className="section-subtitle">Beneficios especiales para miembros registrados</p>
                </div>
                
                <div className="offers-grid">
                  <div className="offer-card">
                    <div className="offer-media">
                      <img 
                        src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1739983616/pexels-dadgrass-10263719_vbwjo4.jpg" 
                        alt="Aceite Medicinal Premium"
                        className="offer-image"
                      />
                      <div className="offer-badge">20% OFF</div>
                    </div>
                    <div className="offer-details">
                      <h3 className="offer-title">Aceite Full Spectrum</h3>
                      <div className="offer-pricing">
                        <span className="original-price">$875</span>
                        <span className="current-price">$699</span>
                      </div>
                      <ul className="offer-features">
                        <li>✅ Concentración 1:20</li>
                        <li>✅ Certificado COA</li>
                        <li>✅ Envío Prioritario</li>
                      </ul>
                      <button className="offer-cta">
                        <span>Ver Especificaciones</span>
                        <svg className="cta-icon" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              
              <section className="benefits">
                <h2>Beneficios de Ser Parte de Reprocan</h2>
                <div className="benefit-card">
                  <div className="image-container">
                    <img
                      src="https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto,c_fill,g_auto/v1736181510/pexels-mccutcheon-3676962_qzkerr.jpg"
                      alt="Acceso exclusivo a productos medicinales"
                      loading="lazy"
                    />
                  </div>
                  <div className="benefit-info">
                    <h3>Acceso Exclusivo a Productos</h3>
                    <p>
                      Obtén productos de cannabis medicinal con descuentos
                      exclusivos y acceso anticipado.
                    </p>
                  </div>
                </div>

                <div className="benefit-card">
                  <div className="image-container">
                    <img
                      src="https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto,c_fill,g_face/v1736181986/pexels-n-voitkevich-7852556_tf3lpw.jpg"
                      alt="Formación profesional en cannabis medicinal"
                      loading="lazy"
                    />
                  </div>
                  <div className="benefit-info">
                    <h3>Formación Constante</h3>
                    <p>
                      Recibe actualizaciones y formación constante sobre las
                      mejores prácticas en el uso de cannabis medicinal.
                    </p>
                  </div>
                </div>
              </section>

              <section className="how-it-works">
                <h2>¿Cómo Funciona Reprocan?</h2>
                <div className="process-steps">
                  <div className="step">
                    <div className="step-icon">📋</div>
                    <p>
                      Reprocan te permite acceder a un mercado exclusivo de
                      cannabis medicinal, donde podrás beneficiar a tus
                      pacientes y aumentar tu red de contactos.
                    </p>
                  </div>
                  <div className="step">
                    <div className="step-icon">💼</div>
                    <p>
                      Si eres gestor, puedes vender productos y quedarte con un
                      porcentaje. Ofrecemos asesoramiento continuo para
                      maximizar tu rendimiento y crecimiento.
                    </p>
                  </div>
                </div>
              </section>

              <section className="call-to-action">
                <h2>¡Únete a Nosotros!</h2>
                <div className="cta-content">
                  <p>
                    Contáctanos hoy mismo y comienza a disfrutar de todos los
                    beneficios que te ofrece Reprocan.
                  </p>
                  <button className="cta-button">Contactar</button>
                </div>
              </section>
            </main>
          </div>

          <footer className="newsletter-footer">
            <p>&copy; 2025 Cannabis Medicinal, Todos los derechos reservados</p>
          </footer>
        </div>
      )}
    </>
  );
};

export default Newsletter;
