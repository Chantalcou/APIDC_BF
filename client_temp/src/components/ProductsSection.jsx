import React, { useEffect, useState } from "react";
import ScrollArrow from "./ScrollArrow.jsx";
import LittleSpinner from "./LittleSpinner.jsx";
import $ from "jquery";
import SpinnerComponent from "./SpinnerComponent.jsx";
import "./ProductsSection.css";

const ProductsSection = () => {
  const [loading, setLoading] = useState(true);
  const [activeCultivo, setActiveCultivo] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleImageLoad = () => {
    try {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error loading image:", error);
    } finally {
      // Esto se ejecutará sin importar si hay error o no
      console.log("Imagen cargada o error manejado");
    }
  };
  

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedProduct) {
        closeProductDetail();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProduct]);

  const cultivos = {
    indoor: {
      name: "Indoor",
      description: "Cultivo en interiores con control total del ambiente.",
      icon: "🏠",
      details: (
        <div className="cultivo-details">
          <div className="cultivo-benefits">
            <h4>Características principales:</h4>
            <ul>
              <li>Control total de temperatura y humedad</li>
              <li>Protección contra plagas externas</li>
              <li>Ciclos de luz optimizados (18/6 y 12/12)</li>
              <li>Sistema de ventilación profesional</li>
            </ul>
            <div className="cultivo-stats">
              <div className="stat-item">
                <span>🌡 Temperatura ideal:</span>
                <span>20-25°C</span>
              </div>
              <div className="stat-item">
                <span>💧 Humedad:</span>
                <span>40-60%</span>
              </div>
              <div className="stat-item">
                <span>💡 Iluminación:</span>
                <span>LED 600W</span>
              </div>
            </div>
            <p className="cultivo-tip">
              💡 Ideal para cultivos medicinales de alta precisión.
            </p>
          </div>
        </div>
      )
    },
    outdoor: {
      name: "Outdoor",
      description: "Cultivo en exteriores con luz natural.",
      icon: "🌞",
      details: (
        <div className="cultivo-details">
          <div className="cultivo-benefits">
            <h4>Ventajas naturales:</h4>
            <ul>
              <li>Luz solar directa</li>
              <li>Espacio ilimitado para crecimiento</li>
              <li>Ciclo natural de luz</li>
              <li>Menor costo energético</li>
            </ul>
            <div className="cultivo-stats">
              <div className="stat-item">
                <span>🌦 Estación ideal:</span>
                <span>Primavera - Verano</span>
              </div>
              <div className="stat-item">
                <span>📏 Tamaño máximo:</span>
                <span>3-4 metros</span>
              </div>
              <div className="stat-item">
                <span>⏳ Ciclo:</span>
                <span>6-8 meses</span>
              </div>
            </div>
            <p className="cultivo-tip">
              🌱 Recomendado para variedades autoflorecientes.
            </p>
          </div>
        </div>
      )
    },
    greenhouse: {
      name: "Greenhouse",
      description: "Cultivo en invernadero con luz controlada.",
      icon: "🌿",
      details: (
        <div className="cultivo-details">
          <div className="cultivo-benefits">
            <h4>Equilibrio perfecto:</h4>
            <ul>
              <li>Protección contra elementos externos</li>
              <li>Luz natural complementada</li>
              <li>Control de microclima</li>
              <li>Mayor producción que el cultivo exterior</li>
            </ul>
            <div className="cultivo-stats">
              <div className="stat-item">
                <span>🌡 Temperatura:</span>
                <span>18-28°C</span>
              </div>
              <div className="stat-item">
                <span>🛡 Protección:</span>
                <span>UV 50%</span>
              </div>
              <div className="stat-item">
                <span>📶 Control:</span>
                <span>Sensores IoT</span>
              </div>
            </div>
            <p className="cultivo-tip">
              🏆 Sistema preferido para producción comercial.
            </p>
          </div>
        </div>
      )
    },
  };

  const products = [
    {
      image: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1742923889/Dise%C3%B1o_sin_t%C3%ADtulo_10_cmaf1r.png",
      title: "9-10 Juanita0G",
      description: "Híbrido equilibrado con efectos relajantes.",
      details: {
        thc: "22%",
        cbd: "1%",
        genetics: "OG Kush x Blueberry",
        flowering: "8-9 semanas",
        yield: "500g/m²"
      }
    },
    {
      image: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1742923770/Dise%C3%B1o_sin_t%C3%ADtulo_9_faj7rl.png",
      title: "Tropical Kush",
      description: "Híbrido con efectos eufóricos y calmantes.",
      details: {
        thc: "18%",
        cbd: "2%",
        genetics: "Hawaiian x Skunk",
        flowering: "10-12 semanas",
        yield: "800g/planta"
      }
    },
    {
      image: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1742924075/Dise%C3%B1o_sin_t%C3%ADtulo_11_b2vndp.png",
      title: "Dosi-chock",
      description: "Variedad premium con alto contenido de resina.",
      details: {
        thc: "25%",
        cbd: "0.5%",
        genetics: "Girl Scout Cookies x OG Kush",
        flowering: "9-10 semanas",
        yield: "700g/m²"
      }
    },
    {
      image: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1742996864/Dise%C3%B1o_sin_t%C3%ADtulo_1_p4p2pg.png",
      title: "Dosi-Dos",
      description: "Potente efecto físico y mental equilibrado.",
      details: {
        thc: "27%",
        cbd: "1%",
        genetics: "Do-Si-Dos x OGKB",
        flowering: "8-9 semanas",
        yield: "450g/m²"
      }
    },
  ];

  const CultivoDescription = ({ cultivo }) => {
    const current = cultivos[cultivo];
    return (
      <div className="cultivo-info-box">
        <h3 className="cultivo-title">
          {current.icon} {current.name}
        </h3>
        <p className="cultivo-brief">{current.description}</p>
        {current.details}
      </div>
    );
  };

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    document.body.classList.add("modal-open");
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
    document.body.classList.remove("modal-open");
  };

  const scrollToSection = (sectionId) => {
    $("html, body").animate(
      {
        scrollTop: $("#" + sectionId).offset().top,
      },
      1000
    );
  };
  useEffect(() => {
    // Forzar que 'loading' sea false después de 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  
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
                src="https://res.cloudinary.com/dqgjcfosx/video/upload/c_scale,w_1280,h_720,f_auto,q_auto/v1737553912/12361112-uhd_3840_2160_30fps_ca2hwm.mp4"
                type="video/mp4"
                onLoadedData={handleImageLoad} 
              />
              Tu navegador no soporta la etiqueta de video.
            </video>
            <div className="static-content d-flex flex-column justify-content-center align-items-center h-100">
              <div className="titles">
                <h1 className="product-title">TERAPIAS QUE FLORECEN</h1>
                <h1 className="hero-subtitle">Sanación que nace de la tierra</h1>
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

      <section id="product-section" className="products-section">
        <div className="container">
          <h2 className="section-title" style={{ fontWeight: "bold", color: "#0a9d6d" }}>
            Nuestros servicios
          </h2>
          <h3 className="section-title" style={{ fontSize: "1rem", color: "#0a9d6d" }}>
            Gestioná tu medicina
          </h3>

          {loading && <LittleSpinner />}

          <div className="cultivo-filters">
            <button
              className={`cultivo-filter ${activeCultivo === "all" ? "active" : ""}`}
              onClick={() => setActiveCultivo("all")}
            >
              Ver todos
            </button>
            {Object.keys(cultivos).map((key) => (
              <button
                key={key}
                className={`cultivo-filter ${activeCultivo === key ? "active" : ""}`}
                onClick={() => setActiveCultivo(key)}
              >
                <span className="cultivo-icon">{cultivos[key].icon}</span>
                {cultivos[key].name}
              </button>
            ))}
          </div>

          {activeCultivo !== "all" && (
            <CultivoDescription cultivo={activeCultivo} />
          )}
        </div>
      </section>
    </>
  );
};

export default ProductsSection;
