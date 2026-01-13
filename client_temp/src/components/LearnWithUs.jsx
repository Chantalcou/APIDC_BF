import React, { useState } from "react";
import "./LearnWithUs.css";

const LearnWithUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTestimonials, setCurrentTestimonials] = useState([]);
  const [activeTab, setActiveTab] = useState("EVENTOS");

  const HERO_IMAGE =
    "https://res.cloudinary.com/dqgjcfosx/image/upload/v1768229156/ChatGPT_Image_12_ene_2026_11_45_09_a.m._h2utsh.png";

  const events = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1768309786/expo--_bwcq9n.png",
      year: "2026" // Año para eventos
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762354907/cannabis_3_-4_compressed_page-0001_akrngk.jpg",
      year: "2025"
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762354908/cannabis_3_-5_compressed_page-0001_aeq0gp.jpg",
      year: "2025"
    },
  ];

  const capacitaciones2025 = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1752586473/WhatsApp_Image_2025-07-14_at_3.16.26_PM_1_psenun.jpg",
      year: "2025"
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1752591009/WhatsApp_Image_2025-07-15_at_11.37.49_AM_zyg75b.jpg",
      year: "2025"
    },
  ];

  const capacitaciones2026 = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1768236747/ChatGPT_Image_12_ene_2026_01_51_43_p.m._e5ppif.png",
      year: "2026"
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1768237002/ChatGPT_Image_12_ene_2026_01_55_53_p.m._q7jtt7.png",
      year: "2026"
    },
  ];

  const openTestimonials = (testimonials = []) => {
    setCurrentTestimonials(testimonials);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeTestimonials = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // Función modificada para renderizar con año para TODOS los items
  const renderGrid = (items, altPrefix) => (
    <div className="events-grid">
      {items.map((item) => (
        <div key={item.id} className="event-card">
          <div className="event-image-wrapper">
            <img
              src={item.image}
              alt={`${altPrefix} ${item.id}`}
              className="event-image"
              loading="lazy"
            />
            {/* Siempre mostrar el badge de año */}
            <div className="year-badge">
              <span className="year-text">{item.year}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="learn-container">
      {/* Hero */}
      <section className="learn-hero">
        <div className="learn-hero-inner">
          <div className="learn-hero-left">
            <h1 className="learn-hero-title">
              <span className="hero-title-line">Cursos y capacitaciones</span>
              <span className="hero-title-line">en Cannabis Medicinal</span>
            </h1>
            <p className="learn-hero-subtitle">
              <strong>APIDC</strong>.
            </p>
          </div>

          <div
            className="learn-hero-right"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Navigation */}
      <div className="year-navigation">
        <div className="year-nav-container">
          <button
            className={`year-nav-btn ${activeTab === "EVENTOS" ? "active" : ""}`}
            onClick={() => setActiveTab("EVENTOS")}
            type="button"
          >
            <span className="year-number">Eventos</span>
            <span className="year-label">2025</span>
          </button>

          <button
            className={`year-nav-btn ${activeTab === "CAP_2025" ? "active" : ""}`}
            onClick={() => setActiveTab("CAP_2025")}
            type="button"
          >
            <span className="year-number">Capacitaciones</span>
            <span className="year-label">2025</span>
          </button>

          <button
            className={`year-nav-btn ${activeTab === "CAP_2026" ? "active" : ""}`}
            onClick={() => setActiveTab("CAP_2026")}
            type="button"
          >
            <span className="year-number">Capacitaciones</span>
            <span className="year-label">2026</span>
          </button>
        </div>
      </div>

      {/* EVENTOS - Ahora con año */}
      {activeTab === "EVENTOS" && (
        <section className="events-section">
          <div className="events-container">
            <div className="events-header">
              <h2 className="events-title">Eventos 2025</h2>
            </div>
            {renderGrid(events, "Evento")}
          </div>
        </section>
      )}

      {/* CAP 2025 */}
      {activeTab === "CAP_2025" && (
        <section className="events-section">
          <div className="events-container">
            <div className="events-header">
              <h2 className="events-title">Capacitaciones 2025</h2>
            </div>
            {renderGrid(capacitaciones2025, "Capacitación")}
          </div>
        </section>
      )}

      {/* CAP 2026 */}
      {activeTab === "CAP_2026" && (
        <section className="events-section">
          <div className="events-container">
            <div className="events-header">
              <h2 className="events-title">Capacitaciones 2026</h2>
              <p className="events-subtitle">Próximamente</p>
            </div>
            {renderGrid(capacitaciones2026, "Capacitación")}
          </div>
        </section>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="testimonial-modal active">
          <div
            className="testimonial-modal-backdrop"
            onClick={closeTestimonials}
          />
          <div className="testimonial-modal-content">
            <button
              className="modal-close-btn"
              onClick={closeTestimonials}
              type="button"
              aria-label="Cerrar"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="modal-header">
              <h3 className="modal-title">Experiencias de Nuestros Alumnos</h3>
              <p className="modal-subtitle">
                Lo que dicen profesionales que han participado en nuestras capacitaciones
              </p>
            </div>

            <div className="testimonials-list">
              {currentTestimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-quote">"</div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <span className="author-name">{testimonial.author}</span>
                      {testimonial.role && (
                        <span className="author-role">{testimonial.role}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnWithUs;