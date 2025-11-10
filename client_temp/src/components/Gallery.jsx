import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Gallery.css";

const slides = [
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791032/Jornada_10_Noviembre_UNR-1_page-0001_fczkx3.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791032/Jornada_10_Noviembre_UNR-2_page-0001_qs4ihx.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791033/Jornada_10_Noviembre_UNR-3_page-0001_skukrg.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791032/Jornada_10_Noviembre_UNR-4_page-0001_ogppu6.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791033/Jornada_10_Noviembre_UNR-5_page-0001_r7amnt.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791040/Jornada_10_Noviembre_UNR-6_page-0001_djsotb.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791036/Jornada_10_Noviembre_UNR-7_page-0001_nwldh6.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791036/Jornada_10_Noviembre_UNR-8_page-0001_qg6qo7.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791036/Jornada_10_Noviembre_UNR-9_page-0001_qixouw.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791035/Jornada_10_Noviembre_UNR-10_page-0001_ws86io.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791036/Jornada_10_Noviembre_UNR-11_page-0001_c9fpyy.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791041/Jornada_10_Noviembre_UNR-12_page-0001_jvyqvr.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791037/Jornada_10_Noviembre_UNR-13_page-0001_v4fm4z.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791039/Jornada_10_Noviembre_UNR-14_page-0001_sjmunm.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791038/Jornada_10_Noviembre_UNR-15_page-0001_aigkbv.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791038/Jornada_10_Noviembre_UNR-16_page-0001_dutn0l.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791039/Jornada_10_Noviembre_UNR-17_page-0001_rcfriy.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791040/Jornada_10_Noviembre_UNR-18_page-0001_jika7l.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791040/Jornada_10_Noviembre_UNR-19_page-0001_jlh3cq.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791040/Jornada_10_Noviembre_UNR-20_page-0001_wshonb.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791042/Jornada_10_Noviembre_UNR-21_page-0001_s2srmy.jpg",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791042/Jornada_10_Noviembre_UNR-22_page-0001_q3jzbe.jpg",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dqgjcfosx/video/upload/v1762520200/TYZER2025-09-19_at_12.53.31_1_bxgf6p.mp4",
    title: 'AVANCE EXCLUSIVO - PRÓXIMO DOCUMENTAL',
    description: 'Activa el sonido para una experiencia completa'
  },{
    type: "image",
    src: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762791042/Jornada_10_Noviembre_UNR-24_page-0001_niv3qn.jpg",
  },
];

const Gallery = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false); // CORREGIDO: empieza en false (pausado)
  const [showVideoOverlay, setShowVideoOverlay] = useState(true);
  const resumeAutoPlayTimeout = useRef(null);
  const videoRef = useRef(null);

  const totalSlides = slides.length;
  const isVideoSlide = slides[activeSlide].type === "video";

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    if (resumeAutoPlayTimeout.current) {
      clearTimeout(resumeAutoPlayTimeout.current);
    }

    setActiveSlide(index);
    setIsPlaying(false);
    resumeAutoPlayTimeout.current = setTimeout(() => {
      if (slides[index].type !== "video") {
        setIsPlaying(true);
      }
    }, 5000);
  };

  // Autoplay solo para imágenes
  useEffect(() => {
    if (!isPlaying) return;
    if (isVideoSlide) return;

    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => clearTimeout(timer);
  }, [isPlaying, activeSlide, isVideoSlide]);

  // Control del video - CORREGIDO
  useEffect(() => {
    const current = slides[activeSlide];

    if (current.type === "video") {
      setIsPlaying(false);
      setShowVideoOverlay(true);
      
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = isVideoMuted;
        videoRef.current.pause(); // Asegurar que empiece pausado
      }
      setIsVideoPlaying(false); // Resetear a pausado al cambiar slide
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsVideoPlaying(false);
      setShowVideoOverlay(true);
    }
  }, [activeSlide, isVideoMuted]);

  // CORREGIDO: Función simplificada para play/pause del video
  const handleVideoPlayPause = () => {
    if (!videoRef.current) return;
    
    if (isVideoPlaying) {
      // Pausar
      videoRef.current.pause();
      setIsVideoPlaying(false);
      setShowVideoOverlay(true);
    } else {
      // Reproducir
      videoRef.current.play().catch(console.error);
      setIsVideoPlaying(true);
      setShowVideoOverlay(false);
    }
  };

  const toggleVideoMute = () => {
    if (!isVideoSlide || !videoRef.current) return;
    setIsVideoMuted((prev) => {
      const next = !prev;
      videoRef.current.muted = next;
      return next;
    });
  };

  const toggleGlobalPlayPause = () => {
    if (resumeAutoPlayTimeout.current) {
      clearTimeout(resumeAutoPlayTimeout.current);
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="gallery-container">
      {/* Fondo minimalista */}
      <div className="background-overlay" />

      {/* Header SpaceX Style */}
      <motion.div
        className="gallery-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="title-main">JORNADA ACADÉMICA</span>
          <span className="title-accent">UNR · APIDC</span>
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          COOPERACIÓN CIENTÍFICA EN CANNABIS MEDICINAL · NOVIEMBRE 2024
        </motion.p>
      </motion.div>

      {/* Carrusel Principal */}
      <div className="carousel-wrapper">
        <div className="carousel-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              className="carousel-slide"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="slide-content">
                {slides[activeSlide].type === "image" && (
                  <>
                    <div className="image-wrapper">
                      <img
                        src={slides[activeSlide].src}
                        alt="Jornada académica UNR APIDC"
                        className="carousel-image"
                        loading="eager"
                      />
                    </div>
                  </>
                )}

                {slides[activeSlide].type === "video" && (
                  <>
                    <div className="video-wrapper">
                      <video
                        ref={videoRef}
                        className="carousel-video"
                        playsInline
                        muted={isVideoMuted}
                        loop
                      >
                        <source src={slides[activeSlide].src} type="video/mp4" />
                      </video>
                      
                      {/* Overlay que desaparece al hacer play - CORREGIDO: posición abajo */}
                      <AnimatePresence>
                        {showVideoOverlay && (
                          <motion.div 
                            className="video-overlay-content"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div
                              className="video-info"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <h3 className="video-title">{slides[activeSlide].title}</h3>
                              <p className="video-description">{slides[activeSlide].description}</p>
                              
                              {/* Botón de play grande */}
                              <motion.button
                                className="video-play-button"
                                onClick={handleVideoPlayPause}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                              >
                                <span className="play-icon">▶</span>
                                <span className="play-text">Reproducir Avance</span>
                              </motion.button>

                              {isVideoMuted && (
                                <motion.div 
                                  className="sound-indicator"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.6 }}
                                >
                                  <span className="sound-icon">🔇</span>
                                  <span className="sound-text">Sonido desactivado</span>
                                </motion.div>
                              )}
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Controles del video - Solo visibles cuando el video está reproduciéndose */}
                    <AnimatePresence>
                      {isVideoPlaying && (
                        <motion.div 
                          className="video-controls"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                        >
                          <button
                            className="control-btn"
                            onClick={handleVideoPlayPause}
                            aria-label="Pausar video"
                          >
                            ❚❚
                          </button>
                          <button
                            className="control-btn"
                            onClick={toggleVideoMute}
                            aria-label={isVideoMuted ? "Activar sonido" : "Desactivar sonido"}
                          >
                            {isVideoMuted ? "🔇" : "🔊"}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controles de Navegación */}
          <button
            className="nav-btn prev"
            onClick={prevSlide}
            aria-label="Slide anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            className="nav-btn next"
            onClick={nextSlide}
            aria-label="Siguiente slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Play/Pause Global - Solo para imágenes */}
          {!isVideoSlide && (
            <button
              className="play-pause-btn"
              onClick={toggleGlobalPlayPause}
              aria-label={isPlaying ? "Pausar carrusel" : "Reanudar carrusel"}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
          )}

          {/* Contador */}
          <div className="slide-counter">
            <span className="current">{String(activeSlide + 1).padStart(2, "0")}</span>
            <span className="separator">/</span>
            <span className="total">{String(totalSlides).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Barra de Progreso - Solo para imágenes */}
        <div className="progress-container">
          <motion.div
            className="progress-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isPlaying && !isVideoSlide ? 1 : 0 }}
            transition={{ duration: 5, ease: "linear" }}
            key={activeSlide}
          />
        </div>

        {/* Indicadores */}
        <div className="indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === activeSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir al slide ${index + 1}`}
            >
              <div className="indicator-dot" />
            </button>
          ))}
        </div>
      </div>

      {/* Miniaturas */}
      <motion.div
        className="thumbnails-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="thumbnails-scroll">
          {slides.map((slide, index) => (
            <motion.button
              key={index}
              className={`thumbnail ${index === activeSlide ? 'active' : ''} ${slide.type === 'video' ? 'video' : ''}`}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Ver ${slide.type === 'video' ? 'video' : 'imagen'} ${index + 1}`}
            >
              {slide.type === "image" ? (
                <img
                  src={slide.src}
                  alt={`Miniatura ${index + 1}`}
                  className="thumbnail-image"
                />
              ) : (
                <div className="thumbnail-video">
                  <span className="play-icon">▶</span>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Gallery;