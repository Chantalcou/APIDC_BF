import React from "react";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <div className="newsletter-container">
      <header className="newsletter-header">
        {/* <h1>Bienvenidos a Nuestro Newsletter de Cannabis Medicinal</h1>
        <p>Recibe las últimas noticias, consejos y beneficios sobre Reprocan y más.</p> */}
      </header>

      <div className="content">
        {/* Lateral con Noticias */}
        <aside className="sidebar">
          <h2>Últimas Noticias sobre Cannabis Medicinal</h2>
          <div className="news-item">
            <img src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1736181619/pexels-mdsnmdsnmdsn-3697718_tgaq7k.jpg" alt="Cannabis News 1" />
            <p>
              <strong>La Industria del Cannabis Medicinal está Creciendo</strong><br />
              Conozca las proyecciones para 2025 y cómo los cambios en la legislación están impactando el mercado...
            </p>
          </div>
          <div className="news-item">
            <img src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1736181808/pexels-chokniti-khongchum-1197604-2280551_nw4xe5.jpg" alt="Cannabis News 2" />
            <p>
              <strong>Reprocan: Un Certificado para el Futuro</strong><br />
              ¿Qué es Reprocan y por qué cada vez más profesionales buscan obtener este certificado?
            </p>
          </div>
        </aside>

        {/* Contenido Principal */}
        <main className="main-content">
          <section className="benefits">
            <h2>Beneficios de Ser Parte de Reprocan</h2>
            <div className="benefit-card">
              <img src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1736181510/pexels-mccutcheon-3676962_qzkerr.jpg" alt="Beneficio 1" />
              <h3>Acceso Exclusivo a Productos</h3>
              <p>
                Obtén productos de cannabis medicinal con descuentos exclusivos y acceso anticipado.
              </p>
            </div>
            <div className="benefit-card">
              <img src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1736181986/pexels-n-voitkevich-7852556_tf3lpw.jpg" alt="Beneficio 2" />
              <h3>Formación Constante</h3>
              <p>
                Recibe actualizaciones y formación constante sobre las mejores prácticas en el uso de cannabis medicinal.
              </p>
            </div>
          </section>

          <section className="how-it-works">
            <h2>¿Cómo Funciona Reprocan?</h2>
            <p>
              Reprocan te permite acceder a un mercado exclusivo de cannabis medicinal, donde podrás beneficiar a tus pacientes
              y aumentar tu red de contactos. Si eres gestor, puedes vender productos y quedarte con un porcentaje.
            </p>
            <p>
              Además, ofrecemos asesoramiento continuo para maximizar tu rendimiento y crecimiento dentro de la industria.
            </p>
          </section>

          <section className="call-to-action">
            <h2>¡Únete a Nosotros!</h2>
            <p>
              Contáctanos hoy mismo y comienza a disfrutar de todos los beneficios que te ofrece Reprocan.
            </p>
            <button>Contactar</button>
          </section>
        </main>
      </div>

      <footer className="newsletter-footer">
        <p>&copy; 2025 Cannabis Medicinal, Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Newsletter;
