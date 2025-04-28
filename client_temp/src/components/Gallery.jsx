import React from "react";
import { motion } from "framer-motion";
import "./Gallery.css";

const Gallery = () => {
  const images = [
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
    // Últimas 3 imágenes con bottom: true
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
    ...images.filter(img => !img.bottom),
    ...images.filter(img => img.bottom)
  ];

  return (
    <section className="gallery-container">
      <motion.h2
        className="section-title"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <span style={{ color: "#f7d046" }}>El corazón de </span>
        <span style={{ color: "#0a9d6d" }}>APIDC</span>
      </motion.h2>

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
  );
};

export default Gallery;