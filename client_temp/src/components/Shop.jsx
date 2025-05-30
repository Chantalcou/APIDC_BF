import React, { useEffect, useState } from "react";
import ScrollArrow from "./ScrollArrow.jsx";
import SpinnerComponent from "./SpinnerComponent"; // Importamos el spinner
import $ from "jquery";
import "./Shop.css";

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Simula carga durante 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const optimizedImage = (url, width = 600, blur = 0, px = 0) =>
    `${url}?f=auto&q=auto&w=${width}${blur ? `&blur=${blur}&px=${px}` : ""}`;

  const products = [
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1739811212/WhatsApp_Image_2025-02-07_at_19.28.59_1_etoozw.jpg",
      hoverImage:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1739983617/pexels-n-voitkevich-7852732_vfoyn3.jpg",
      title: "White Widow",
      description:
        "Una de las variedades más populares, conocida por su alto contenido de resina y efectos equilibrados. Es famosa por su potencia, sabor terroso y afrutado, y efectos relajantes.",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1739811212/WhatsApp_Image_2025-02-07_at_19.28.59_1_etoozw.jpg",
      hoverImage:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1739983616/pexels-dadgrass-10263719_vbwjo4.jpg",
      title: "Blue Dream",
      description:
        "Híbrida entre la Blueberry y la Haze, esta cepa es conocida por sus efectos eufóricos y calmantes. Es ideal para aliviar el estrés y la ansiedad, con un sabor dulce y afrutado.",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1739811212/WhatsApp_Image_2025-02-07_at_19.28.59_1_etoozw.jpg",
      hoverImage:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1739983616/pexels-dadgrass-12672328_s3x5yp.jpg",
      title: "OG Kush",
      description:
        "Esta variedad es famosa por su potencia y efectos relajantes. Tiene un perfil de sabor a tierra y cítricos, y es utilizada por quienes buscan alivio para el dolor y la ansiedad.",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1739811212/WhatsApp_Image_2025-02-07_at_19.28.59_1_etoozw.jpg",
      hoverImage:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1739979622/pexels-karolina-grabowska-4021773_zwm2ji.jpg",
      title: "Northern Lights",
      description:
        "Conocida por su resistencia y facilidad de cultivo, esta variedad índica tiene efectos profundamente relajantes. Su sabor es dulce y terroso, y es perfecta para la relajación nocturna.",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1739811212/WhatsApp_Image_2025-02-07_at_19.28.59_1_etoozw.jpg",
      hoverImage:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1739979622/pexels-karolina-grabowska-4021773_zwm2ji.jpg",
      title: "Amnesia Haze",
      description:
        "Una variedad sativa que produce efectos cerebrales energizantes. Su sabor cítrico y afrutado la convierte en una opción popular entre quienes buscan elevar su ánimo y creatividad.",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1739811212/WhatsApp_Image_2025-02-07_at_19.28.59_1_etoozw.jpg",
      hoverImage:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1739979622/pexels-karolina-grabowska-4021773_zwm2ji.jpg",
      title: "Green Crack",
      description:
        "Conocida por su efecto energizante, esta sativa es excelente para aumentar la productividad y la concentración. Tiene un sabor fresco y afrutado, ideal para empezar el día con energía.",
    },
  ];

  const scrollToSection = (sectionId) => {
    $("html, body").animate(
      {
        scrollTop: $("#" + sectionId).offset().top,
      },
      1000
    );
  };

  useEffect(() => {
    products.forEach((product) => {
      const img = new Image();
      img.src = product.hoverImage;
    });
  }, [products]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading ? (
        <SpinnerComponent />
      ) : (
        <div className="container-fluid p-0 main-content">
          <div className="video-container">
            <video autoPlay muted loop className="home-bg-video">
              <source
                src="https://res.cloudinary.com/dqgjcfosx/video/upload/v1737553912/12361112-uhd_3840_2160_30fps_ca2hwm.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="static-content_shop d-flex flex-column justify-content-center align-items-center h-100">
              <div className="titles">
                <h1 className="product-title">NATURALEZA EN GOTAS</h1>
                <span className="hero-subtitle">
                  Descubrí el poder de los aceites medicinales
                </span>
              </div>
            </div>

            <div className="static-content d-flex flex-column justify-content-center align-items-center mt-5 h-100 position-relative">
              <ScrollArrow
                className="custom-scroll-arrow_products"
                onClick={() => scrollToSection("products")}
                color="#fff"
              />
            </div>
          </div>
        </div>
      )}

      <div>
      <div className="under-construction-wrapper">
  <img
    src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1742999284/under-construction_jagbpx.jpg"
    alt="Under construction"
    className="under-construction-img"
  />
</div>


      </div>

      {/* 
      <section id="product-section" className="products-section">
        <div className="container">
          <h2
            className="section-title"
            style={{ fontWeight: "bold", color: "#0a9d6d" }}
          >
            Nuestros Productos
          </h2>

          {loading && <SpinnerComponent />}

          {!loading && (
            <div id="products" className="products-grid">
              {products.map((product, index) => (
                <div
                  className="product-card"
                  onTouchStart={() => setHoveredIndex(index)}
                  onTouchEnd={() => setHoveredIndex(null)}
                  key={index}
                >
                  <div className="image-container">
                    <img
                      src={hoveredIndex === index ? product.hoverImage : product.image}
                      alt={`${product.title} - Vista detallada`}
                      aria-hidden="true"
                      role="presentation"
                      className="product-image"
                      onLoad={handleImageLoad}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      loading="lazy"
                    />
                  </div>
                  <div className="product-info">
                    <h3
                      className="product-title_card"
                      style={{ color: "#0a9d6d", fontSize: "2rem" }}
                    >
                      {product.title}
                    </h3>
                    <p className="product-description">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section> 
      */}
    </>
  );
};

export default Shop;
