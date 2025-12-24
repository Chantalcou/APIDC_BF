// LearnWithUs.jsx
import React, { useState } from "react";
import "./LearnWithUs.css";

/* =========================
   NUEVAS CAPACITACIONES
   ========================= */

const newTrainingsData = [
  {
    title: "Cultivo in vitro de Cannabis",
    image:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762354907/cannabis_3_-4_compressed_page-0001_akrngk.jpg",
    link: "#",
  },
  {
    title: "Manejo Integrado de Plagas",
    image:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762354908/cannabis_3_-5_compressed_page-0001_aeq0gp.jpg",
    link: "#",
  },
];

/* =========================
   CAPACITACIONES EXISTENTES
   ========================= */

const trainingsData = [
  {
    title: "",
    subtitle: "",
    image:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/v1752586473/WhatsApp_Image_2025-07-14_at_3.16.26_PM_1_psenun.jpg",
    link:
      "https://docs.google.com/forms/d/e/1FAIpQLSfMxYKxAjCIKn8L-kwlwhKO8ervAWdf9DL65Yu9r3MRFoOAlA/viewform?usp=header",
    isPast: true,
    badgeText: "¡UN ÉXITO!",
    testimonials: [
      {
        text:
          "El curso sobre Cultivo in vitro de Cannabis, dictado por el equipo de APIDC, fue excelente y, sobre todo, muy profesional...",
        author: "M.R.",
      },
      {
        text:
          "En referencia al curso estuvo espectacular! Muy interesante el cultivo en vitro...",
        author: "E.B",
      },
    ],
  },
  {
    title: "",
    subtitle: "",
    image:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/v1752591009/WhatsApp_Image_2025-07-15_at_11.37.49_AM_zyg75b.jpg",
    link:
      "https://docs.google.com/forms/d/e/1FAIpQLSe_ZrM875U6pam1I9hJ97PO_hgEOJNTHgPr9bhbRDGHwxsyEQ/viewform?usp=dialog",
    isPast: false,
    badgeText: "¡GRACIAS!",
    testimonials: [],
  },
];

/* =========================
   COMPONENTE
   ========================= */

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
      {/* =========================
          PRÓXIMOS EVENTOS
         ========================= */}
      <section className="clean-trainings">
        <div className="clean-container">
          <div className="clean-header">
            <h1 className="clean-title">Próximos eventos</h1>
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

      {/* =========================
          CAPACITACIONES TÉCNICAS
         ========================= */}
      <section className="learn-section">
        <div className="section-header_learn">
          <h2 className="section-title_learn">
            Capacitaciones Técnicas
          </h2>
        </div>

        <div className="trainings-grid">
          {trainingsData.map((training, index) => (
            <article
              key={index}
              className={`learn-card ${training.isPast ? "past" : ""}`}
              style={{
                backgroundImage: `url(${training.image})`,
              }}
            >
              {training.badgeText && (
                <span className="ribbon">{training.badgeText}</span>
              )}

              <div className="learn-card__overlay" />

              <div className="learn-card__content">
                <div className="card-body">
                  <h3 className="training-title">
                    {training.title}
                  </h3>
                  <p className="training-subtitle">
                    {training.subtitle}
                  </p>
                </div>

                {index === 0 && (
                  <button
                    className="testimonials-button"
                    onClick={() =>
                      openTestimonials(training.testimonials)
                    }
                  >
                    Testimonios
                  </button>
                )}

                {!training.isPast && (
                  <a
                    href={training.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="enroll-button"
                  >
                    Inscribirse
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* =========================
            MODAL TESTIMONIOS
           ========================= */}
        {isModalOpen && (
          <div className="testimonial-modal active">
            <div className="testimonial-content">
              <span
                className="close-modal"
                onClick={closeTestimonials}
              >
                &times;
              </span>

              <h3 className="testimonial-title">
                Experiencias de nuestros alumnos
              </h3>

              {currentTestimonials.map((t, idx) => (
                <div
                  className="testimonial-item"
                  key={idx}
                >
                  <p className="testimonial-text">
                    “{t.text}”
                  </p>
                  <p className="testimonial-author">
                    — {t.author}
                  </p>
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
