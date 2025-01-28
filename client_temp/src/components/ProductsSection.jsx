import React, { useEffect, useState } from "react";
import ScrollArrow from "./ScrollArrow.jsx";
import LittleSpinner from "./LittleSpinner.jsx";
import $ from "jquery";
import "./ProductsSection.css";

const ProductsSection = () => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    // Temporizador para garantizar que el spinner dure al menos 2 segundos
    setTimeout(() => {
      setLoading(false); // Cambia el estado para ocultar el spinner
    }, 2000); // 2000 ms (2 segundos)
  };

  const products = [
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1737993399/pexels-kindelmedia-7773109_jh0l6n.jpg",
      title: "White Widow",
      description:
        "Una de las variedades más populares, conocida por su alto contenido de resina y efectos equilibrados. Es famosa por su potencia, sabor terroso y afrutado, y efectos relajantes.",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1737993398/pexels-perfect-lens-6536878_exlrcm.jpg",
      title: "Blue Dream",
      description:
        "Híbrida entre la Blueberry y la Haze, esta cepa es conocida por sus efectos eufóricos y calmantes. Es ideal para aliviar el estrés y la ansiedad, con un sabor dulce y afrutado.",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1737993398/pexels-printexstar-11652812_uuesob.jpg",
      title: "OG Kush",
      description:
        "Esta variedad es famosa por su potencia y efectos relajantes. Tiene un perfil de sabor a tierra y cítricos, y es utilizada por quienes buscan alivio para el dolor y la ansiedad.",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1737993398/pexels-perfect-lens-8263955_fg8e94.jpg",
      title: "Northern Lights",
      description:
        "Conocida por su resistencia y facilidad de cultivo, esta variedad índica tiene efectos profundamente relajantes. Su sabor es dulce y terroso, y es perfecta para la relajación nocturna.",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1737993398/pexels-perfect-lens-12967923_lgn2au.jpg",
      title: "Amnesia Haze",
      description:
        "Una variedad sativa que produce efectos cerebrales energizantes. Su sabor cítrico y afrutado la convierte en una opción popular entre quienes buscan elevar su ánimo y creatividad.",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1737993398/pexels-perfect-lens-6536878_exlrcm.jpg",
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
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container-fluid p-0 main-content">
        <div className="video-container">
          <video autoPlay muted loop className="home-bg-video">
            <source
              src="https://res.cloudinary.com/dqgjcfosx/video/upload/v1737553912/12361112-uhd_3840_2160_30fps_ca2hwm.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="static-content d-flex flex-column justify-content-center align-items-center h-100">
            <h1 className="product-title">TERAPIAS QUE FLORECEN</h1>
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

      <section id="product-section" className="products-section">
        <div className="container">
          <h2
            className="section-title"
            style={{ fontWeight: "bold", color: "#0a9d6d" }}
          >
            Nuestros Productos
          </h2>

          {/* Mostrar el spinner mientras se cargan las imágenes */}
          {loading && <LittleSpinner />}

          <div id="products" className="products-grid">
            {products.map((product, index) => (
              <div className="product-card" key={index}>
                <div className="image-container">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                    onLoad={handleImageLoad} // Al cargar la imagen, se cambia el estado
                  />
                </div>
                <div className="product-info">
                  <h3
                    className="product-title"
                    style={{ color: "#0a9d6d", fontSize: "2rem" }}
                  >
                    {product.title}
                  </h3>
                  <p className="product-description">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsSection;
