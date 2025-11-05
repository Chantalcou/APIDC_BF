import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Gallery.css";

const Gallery = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const timelineData = [
    {
      id: 1,
      icon: "",
      title: "Habilitación municipal",
      date: "Enero 2024",
      description: "Obtención de la habilitación municipal para el predio de APIDC en Brandsen, con 4 hectáreas destinadas al cultivo de cannabis medicinal y un invernadero de 500 m².",
      highlight: "Primer paso formal que permitió iniciar las actividades bajo el marco regulatorio vigente.",
      image: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1740666960/Dise%C3%B1o_sin_t%C3%ADtulo_mxuge9.png"
    },
    {
      id: 2,
      icon: "",
      title: "REPROCANN aprobado",
      date: "Marzo 2024",
      description: "Aprobación del REPROCANN institucional, habilitando el cultivo de cannabis medicinal bajo la Ley 27.350 y garantizando el acceso seguro a los pacientes asociados a la ONG.",
      highlight: "Marco legal seguro para operaciones",
      image: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1745343363/WhatsApp_Image_2025-04-22_at_14.10.01_bxsz30.jpg"
    },
    {
      id: 3,
      icon: "",
      title: "Firma de convenio con Davis Farms",
      date: "Mayo 2024",
      description: "Firma de acuerdo de cooperación con Davis Hemp Farms (Oregon, EE. UU.), representado en Argentina por Ananda Pampa, para el desarrollo conjunto de variedades de cáñamo industrial.",
      highlight: "Painted Lady, Bhutan Glory, entre otras",
      image: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1761922934/WhatsApp_Image_2025-10-29_at_12.57.19_PM_enflvb.jpg"
    },
    {
      id: 4,
      icon: "",
      title: "Firma de convenio con UNR y CONICET",
      date: "Julio 2024",
      description: "Acuerdo de investigación y desarrollo con la Universidad Nacional de Rosario (Facultad de Ciencias Agrarias) y CONICET, para la caracterización y cuantificación de cannabinoides.",
      highlight: "Participan las cátedras de Fisiología Vegetal y Química Inorgánica",
      image: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1761922910/WhatsApp_Image_2025-10-29_at_12.57.28_PM_badi0l.jpg"
    },
    {
      id: 5,
      icon: "",
      title: "Integración Davis–CONICET–UNR–APIDC",
      date: "Agosto 2024",
      description: "Consolidación del equipo interdisciplinario conformado por Davis Farms, Ananda Pampa, UNR, CONICET y APIDC para el inicio de ensayos conjuntos en Argentina.",
      highlight: "Equipo interdisciplinario consolidado",
      image: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1745336538/WhatsApp_Image_2025-04-01_at_11.51.01_2_qobhew.jpg"
    }
  ];

  const galleryImages = [
    {
      src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1740666960/Dise%C3%B1o_sin_t%C3%ADtulo_mxuge9.png",
      topMain: true,
    },
    {
      src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1745343363/WhatsApp_Image_2025-04-22_at_14.10.01_bxsz30.jpg",
    },
    {
      src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1745343363/WhatsApp_Image_2025-04-22_at_13.59.20_qhyfd3.jpg",
    },
    {
      src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1745343363/WhatsApp_Image_2025-04-22_at_14.10.00_puxpev.jpg",
    },
    {
      src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1745336538/WhatsApp_Image_2025-04-01_at_11.51.01_2_qobhew.jpg",
    },
    {
      src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1745343364/WhatsApp_Image_2025-04-22_at_14.10.43_vwr4rq.jpg",
      main: true,
    },
    {
      src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1745345453/WhatsApp_Image_2025-04-22_at_13.59.20_1_o8bvhu.jpg",
      bottom: true,
    },
    {
      src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1745345453/WhatsApp_Image_2025-04-22_at_13.59.20_1_o8bvhu.jpg",
      bottom: true,
    },
    {
      src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1745345453/WhatsApp_Image_2025-04-22_at_13.59.20_1_o8bvhu.jpg",
      bottom: true,
    },
  ];

  // Ordenar imágenes: las bottom al final
  const sortedImages = [
    ...galleryImages.filter(img => !img.bottom),
    ...galleryImages.filter(img => img.bottom)
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % timelineData.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + timelineData.length) % timelineData.length);
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  // Auto-advance del carousel
  React.useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="nosotros-container">
      {/* Sección Carousel Timeline */}
      {/* <section className="carousel-section">
        <motion.div
          className="carousel-header"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="carousel-icon">
               <motion.h2
          className="section-title"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span style={{ color: "#f7d046" }}>El corazón de </span>
          <span style={{ color: "#0a9d6d" }}>APIDC</span>
        </motion.h2>
          </div>
          <h1 className="carousel-title">
            <span className="carousel-main-title">Línea temporal – </span>
            <span className="carousel-accent">Avances APIDC</span>
          </h1>
          <p className="carousel-subtitle">
            Nuestro camino de crecimiento e innovación en el cannabis medicinal
          </p>
        </motion.div>

        <div className="carousel-container">
    
          <button className="carousel-control prev" onClick={prevSlide}>
            <span>‹</span>
          </button>
          
          <button className="carousel-control next" onClick={nextSlide}>
            <span>›</span>
          </button>

          <div className="carousel-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                className="carousel-slide"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
              >
                <div className="slide-image-container">
                  <img 
                    src={timelineData[activeSlide].image} 
                    alt={timelineData[activeSlide].title}
                    className="slide-image"
                  />
                  <div className="image-overlay"></div>
             
                  <motion.div 
                    className="slide-hover-info"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="hover-icon">{timelineData[activeSlide].icon}</div>
                    <h3 className="hover-title">¿Qué pasó en esta etapa?</h3>
                    <p className="hover-description">{timelineData[activeSlide].description}</p>
                    {timelineData[activeSlide].highlight && (
                      <div className="hover-highlight">
                        <span className="highlight-badge">Destacado</span>
                        {timelineData[activeSlide].highlight}
                      </div>
                    )}
                  </motion.div>
                </div>

                <div className="slide-content">
                  <div className="slide-meta">
                    <div className="slide-date">{timelineData[activeSlide].date}</div>
                    <div className="slide-number">
                      {String(activeSlide + 1).padStart(2, '0')}/{String(timelineData.length).padStart(2, '0')}
                    </div>
                  </div>
                  
                  <h2 className="slide-title">
                    <span className="title-icon">{timelineData[activeSlide].icon}</span>
                    {timelineData[activeSlide].title}
                  </h2>
                  
                  <p className="slide-description">
                    {timelineData[activeSlide].description}
                  </p>
                  
                  {timelineData[activeSlide].highlight && (
                    <div className="slide-highlight">
                      <span className="highlight-arrow">👉</span>
                      <span className="highlight-text">{timelineData[activeSlide].highlight}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="carousel-indicators">
            {timelineData.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === activeSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              >
                <div className="indicator-progress">
                  {index === activeSlide && (
                    <motion.div 
                      className="indicator-progress-bar"
                      layoutId="activeProgress"
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  )}
                </div>
                <span className="indicator-number">{index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </section> */}

      {/* Sección Gallery ORIGINAL */}
      <section className="gallery-container">
     

        <div className="gallery-grid">
          {sortedImages.map((image, index) => (
            <motion.div
              key={index}
              className={`gallery-item 
                ${image.main ? "main" : ""} 
                ${image.topMain ? "top-main" : ""}
                ${image.bottom ? "bottom" : ""}`}
              whileHover={{ scale: image.main || image.topMain ? 1.02 : 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={image.src}
                alt={`Gallery item ${index + 1}`}
                className={image.main || image.topMain ? "" : "bw-filter"}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;