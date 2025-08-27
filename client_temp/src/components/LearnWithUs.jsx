// LearnWithUs.jsx
import React, { useState } from "react";
import "./LearnWithUs.css";

const trainingsData = [
  {
    title: "",
    subtitle: "",
    image:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/v1752586473/WhatsApp_Image_2025-07-14_at_3.16.26_PM_1_psenun.jpg",
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
    image:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/v1752591009/WhatsApp_Image_2025-07-15_at_11.37.49_AM_zyg75b.jpg",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSe_ZrM875U6pam1I9hJ97PO_hgEOJNTHgPr9bhbRDGHwxsyEQ/viewform?usp=dialog",
    isPast: false,
    badgeText: "¡GRACIAS!", // 👈 agregado para mostrar cinta amarilla en el segundo flyer
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
  // {
  //   title: "",
  //   subtitle: "",
  //   image:
  //     "https://res.cloudinary.com/dqgjcfosx/image/upload/v1755010021/WhatsApp_Image_2025-08-11_at_2.25.10_PM_v6a9rl.jpg",
  //   link: "https://docs.google.com/forms/d/e/1FAIpQLScVeo8TLldryp9FjPZksKw0eZ9UZMcku2_HYZ3nfUN3JlTwDA/viewform?usp=header",
  //   isPast: false,
  //   testimonials: [
  //     {
  //       text: "El enfoque práctico de esta capacitación hizo que los conceptos complejos fueran fáciles de entender.",
  //       author: "Lucía Fernández, DevOps Engineer",
  //     },
  //     {
  //       text: "Recomendaría este curso a cualquier profesional que quiera actualizar sus habilidades técnicas.",
  //       author: "Roberto Sánchez, Full Stack Developer",
  //     },
  //   ],
  // },
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
                <p className="testimonial-text">“{t.text}”</p>
                <p className="testimonial-author">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default LearnWithUs;
