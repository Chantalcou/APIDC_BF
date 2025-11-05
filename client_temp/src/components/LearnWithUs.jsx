// LearnWithUs.jsx
import React, { useState } from "react";
import "./LearnWithUs.css";

// Nuevas capacitaciones - ARRIBA DE TODO
const newTrainingsData = [
  {
    title: "Cultivo in vitro de Cannabis",
    image: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762354907/cannabis_3_-4_compressed_page-0001_akrngk.jpg",
    link: "#"
  },
  {
    title: "Manejo Integrado de Plagas", 
    image: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762354908/cannabis_3_-5_compressed_page-0001_aeq0gp.jpg",
    link: "#"
  }
];

// Capacitaciones existentes (mantenemos igual)
const trainingsData = [
  {
    title: "",
    subtitle: "",
    image: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1752586473/WhatsApp_Image_2025-07-14_at_3.16.26_PM_1_psenun.jpg",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSfMxYKxAjCIKn8L-kwlwhKO8ervAWdf9DL65Yu9r3MRFoOAlA/viewform?usp=header",
    isPast: true,
    badgeText: "¡UN ÉXITO!",
    testimonials: [
      {
        text: "El curso sobre Cultivo in vitro de Cannabis, dictado por el equipo de APIDC, fue excelente y, sobre todo, muy profesional. Si bien el contenido fue técnico, resultó accesible y comprensible, al menos para mí, que ya venía leyendo algo sobre el tema.Destaco especialmente la generosidad del equipo al compartir sus métodos y materiales de trabajo, lo cual facilitó enormemente el acceso a la práctica y redujo el margen de error.¡Recomiendo muchísimo este curso! Gracias por transmitir con tanta claridad y compromiso tanto los aspectos teóricos como los prácticos de este apasionante campo. ¡Saludos desde Chaco!",
        author: "M.R.",
      },
      {
        text: "En referencia al curso estuvo espectacular! Muy interesante el cultivo en vitro y muy bien explicado por David y Mirian. Espero ansioso el curso más intensivo para poder aplicarlo a mi espacio de cultivo!.",
        author: "E.B",
      },
    ],
  },
  {
    title: "",
    subtitle: "",
    image: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1752591009/WhatsApp_Image_2025-07-15_at_11.37.49_AM_zyg75b.jpg",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSe_ZrM875U6pam1I9hJ97PO_hgEOJNTHgPr9bhbRDGHwxsyEQ/viewform?usp=dialog",
    isPast: false,
    badgeText: "¡GRACIAS!",
    testimonials: [
      {
        text: "Excelente contenido técnico, muy relevante para las necesidades actuales del mercado.",
        author: "Ana López, Arquitecta de Software",
      },
      {
        text: "Las herramientas y metodologías enseñadas son directamente aplicables en proyectos reales.",
        author: "Juan Pérez, Líder Técnico",
      },
    ],
  },
];

const LearnWithUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTestimonials, setCurrentTestimonials] = useState([]);

  const openTestimonials = (testimonials) => {
    setCurrentTestimonials(testimonials);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeTestimonials = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="learn-container">
      {/* NUEVA SECCIÓN - Capacitaciones Simplificadas */}
      <section className="clean-trainings">
        <div className="clean-container">
          <div className="clean-header">
            <h1 className="clean-title">
              Proximos eventos
            </h1>
           
          </div>
<div className="event-header">
    <h2 className="event-title">
        Explorando la actualidad y el potencial del Cannabis Sativa
    </h2>
    
    <div className="event-details">
        <div className="detail-item">
            <span className="icon">📅</span>
            <span className="detail-text">10 de Noviembre</span>
        </div>
        <div className="detail-item">
            <span className="icon">🕘</span>
            <span className="detail-text">9:00 - 16:00 hs</span>
        </div>
        <div className="detail-item">
            <span className="icon">📍</span>
            <span className="detail-text">Facultad de Ciencias Agrarias, UNR<br/>Zavalla, Santa Fe</span>
        </div>
    </div>

    <div className="event-cta">
        <a 
            href="https://fcagr.unr.edu.ar/agenda/jornada-actualidad-potencial-cannabis" 
            className="info-button"
            target="_blank" 
            rel="noopener noreferrer"
        >
            <span className="button-text">Más Información e Inscripción</span>
            <span className="button-arrow">→</span>
        </a>
    </div>
</div>
          <div className="clean-grid">
            {newTrainingsData.map((training, index) => (
              <div key={index} className="clean-card">
                <div className="clean-image-wrapper">
                  <img 
                    src={training.image} 
                    alt={training.title}
                    className="clean-image"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN ORIGINAL (se mantiene igual) */}
      <section className="learn-section">
        <div className="section-header_learn">
          <h2 className="section-title_learn">Capacitaciones Técnicas</h2>
        </div>

        <div className="trainings-grid">
          {trainingsData.map((training, index) => (
            <article
              key={index}
              className={`learn-card ${training.isPast ? "past" : ""}`}
              style={{ backgroundImage: `url(${training.image})` }}
            >
              {/* Cinta diagonal */}
              {training.badgeText && (
                <span className="ribbon">{training.badgeText}</span>
              )}

              <div className="learn-card__overlay"></div>

              <div className="learn-card__content">
                <div className="card-meta">
                  <span className="training-date">{training.date}</span>
                </div>

                <div className="card-body">
                  <h3 className="training-title">{training.title}</h3>
                  <p className="training-subtitle">{training.subtitle}</p>
                </div>

                {/* ▶️ SOLO la primera card muestra el botón de testimonios */}
                {index === 0 && (
                  <button
                    className="testimonials-button"
                    onClick={() => openTestimonials(training.testimonials)}
                  >
                    Testimonios
                  </button>
                )}

                {/* Botón de inscripción solo para eventos futuros */}
                {!training.isPast && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={training.link}
                    className="enroll-button"
                  >
                    Inscribirse
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Modal de testimonios */}
        {isModalOpen && (
          <div className="testimonial-modal active">
            <div className="testimonial-content">
              <span className="close-modal" onClick={closeTestimonials}>
                &times;
              </span>
              <h3 className="testimonial-title">
                Experiencias de nuestros alumnos
              </h3>

              {currentTestimonials.map((t, idx) => (
                <div className="testimonial-item" key={idx}>
                  <p className="testimonial-text">"{t.text}"</p>
                  <p className="testimonial-author">— {t.author}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default LearnWithUs;