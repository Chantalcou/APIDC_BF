import React, { useEffect, useState } from "react";
import ScrollArrow from "./ScrollArrow.jsx";
import LittleSpinner from "./LittleSpinner.jsx";
import $ from "jquery";
import SpinnerComponent from "./SpinnerComponent.jsx";
import "./ProductsSection.css";

const ProductsSection = () => {
  const [loading, setLoading] = useState(true);
  const [activeCultivo, setActiveCultivo] = useState("all"); // Estado inicial para mostrar todos los productos
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleImageLoad = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
// Cierre con ESC
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
      products: [
        {
          image:
            "https://res.cloudinary.com/dqgjcfosx/image/upload/v1741884125/Flux_Dev_Patrn_abstracto_de_hojas_de_hibisco_en_degrad_de_verd_1_czvxpd.jpg",
          title: "9-10 Juanita0G",
          description: "Híbrido equilibrado con efectos relajantes.",
        },
      ],
    },
    outdoor: {
      name: "Outdoor",
      description: "Cultivo en exteriores con luz natural.",
      icon: "🌞",
      products: [
        {
          image:
            "https://res.cloudinary.com/dqgjcfosx/image/upload/v1741884762/Flux_Dev_Fotografa_macro_de_pia_tropical_deshidratada_con_cris_0_kr5ho0.jpg",
          title: "Tropical Kush",
          description: "Híbrido con efectos eufóricos y calmantes.",
        },
        // Otros productos outdoor...
      ],
    },
    greenhouse: {
      name: "Greenhouse",
      description: "Cultivo en invernaderos con luz controlada.",
      icon: "🌿",
      products: [
        {
          image:
            "https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto/v1737993398/pexels-printexstar-11652812_uuesob.jpg",
          title: "OG Kush",
          description: "Potente y relajante, con sabor a tierra y cítricos.",
        },
        // Otros productos greenhouse...
      ],
    },
  };

  const products = [
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1741884125/Flux_Dev_Patrn_abstracto_de_hojas_de_hibisco_en_degrad_de_verd_1_czvxpd.jpg",
      title: "9-10 Juanita0G",
      description:
        "Una de las variedades más populares, conocida por su alto contenido de resina y efectos equilibrados.",
      cultivo: "outdoor", // Relacionamos el producto con outdoor
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1741884762/Flux_Dev_Fotografa_macro_de_pia_tropical_deshidratada_con_cris_0_kr5ho0.jpg",
      title: "Tropical Kush",
      description:
        "Una de las variedades más populares, conocida por su alto contenido de resina y efectos equilibrados.",
      cultivo: "outdoor", // Relacionamos el producto con outdoor
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1741884939/Flux_Dev_Composicin_de_semillas_de_cacao_en_primer_plano_con_p_1_dtxrkk.jpg",
      title: "Dosi-dos",
      description:
        "Una de las variedades más populares, conocida por su alto contenido de resina y efectos equilibrados.",
      cultivo: "outdoor", // Relacionamos el producto con outdoor
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1737993398/pexels-perfect-lens-8263955_fg8e94.jpg",
      title: "White Widow",
      description:
        "Una de las variedades más populares, conocida por su alto contenido de resina y efectos equilibrados.",
      cultivo: "outdoor", // Relacionamos el producto con outdoor
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto/v1737993399/pexels-kindelmedia-7773109_jh0l6n.jpg",
      title: "White Widow",
      description:
        "Una de las variedades más populares, conocida por su alto contenido de resina y efectos equilibrados.",
      cultivo: "outdoor", // Relacionamos el producto con outdoor
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto/v1737993398/pexels-perfect-lens-6536878_exlrcm.jpg",
      title: "Blue Dream",
      description:
        "Híbrida entre la Blueberry y la Haze, esta cepa es conocida por sus efectos eufóricos y calmantes.",
      cultivo: "greenhouse",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto/v1737993398/pexels-perfect-lens-6536878_exlrcm.jpg",
      title: "Blue Dream",
      description:
        "Híbrida entre la Blueberry y la Haze, esta cepa es conocida por sus efectos eufóricos y calmantes.",
      cultivo: "greenhouse",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto/v1737993398/pexels-perfect-lens-6536878_exlrcm.jpg",
      title: "Blue Dream",
      description:
        "Híbrida entre la Blueberry y la Haze, esta cepa es conocida por sus efectos eufóricos y calmantes.",
      cultivo: "greenhouse",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto/v1737993398/pexels-perfect-lens-6536878_exlrcm.jpg",
      title: "Blue Dream",
      description:
        "Híbrida entre la Blueberry y la Haze, esta cepa es conocida por sus efectos eufóricos y calmantes.",
      cultivo: "greenhouse",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto/v1737993398/pexels-perfect-lens-6536878_exlrcm.jpg",
      title: "Blue Dream",
      description:
        "Híbrida entre la Blueberry y la Haze, esta cepa es conocida por sus efectos eufóricos y calmantes.",
      cultivo: "greenhouse",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto/v1737993398/pexels-printexstar-11652812_uuesob.jpg",
      title: "OG Kush",
      description:
        "Esta variedad es famosa por su potencia y efectos relajantes. Tiene un perfil de sabor a tierra y cítricos.",
      cultivo: "indoor",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto/v1737993398/pexels-printexstar-11652812_uuesob.jpg",
      title: "OG Kush",
      description:
        "Esta variedad es famosa por su potencia y efectos relajantes. Tiene un perfil de sabor a tierra y cítricos.",
      cultivo: "indoor",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto/v1737993398/pexels-printexstar-11652812_uuesob.jpg",
      title: "OG Kush",
      description:
        "Esta variedad es famosa por su potencia y efectos relajantes. Tiene un perfil de sabor a tierra y cítricos.",
      cultivo: "indoor",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto/v1737993398/pexels-printexstar-11652812_uuesob.jpg",
      title: "OG Kush",
      description:
        "Esta variedad es famosa por su potencia y efectos relajantes. Tiene un perfil de sabor a tierra y cítricos.",
      cultivo: "indoor",
    },
    {
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/w_600,q_auto,f_auto/v1737993398/pexels-printexstar-11652812_uuesob.jpg",
      title: "OG Kush",
      description:
        "Esta variedad es famosa por su potencia y efectos relajantes. Tiene un perfil de sabor a tierra y cítricos.",
      cultivo: "indoor",
    },
  ];

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    document.body.classList.add("modal-open"); // Bloquear scroll del fondo
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
            <div className="static-content d-flex flex-column justify-content-center align-items-center h-100">
              <h1 className="product-title">TERAPIAS QUE FLORECEN</h1>
              <h1 className="hero-subtitle">Sanación que nace de la tierra</h1>
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
          <h2
            className="section-title"
            style={{ fontWeight: "bold", color: "#0a9d6d" }}
          >
            Nuestros Productos
          </h2>

          {loading && <LittleSpinner />}

          <div className="cultivo-filters">
            <button
              className={`cultivo-filter ${
                activeCultivo === "all" ? "active" : ""
              }`}
              onClick={() => setActiveCultivo("all")}
            >
              Ver Todos
            </button>
            {Object.keys(cultivos).map((key) => (
              <button
                key={key}
                className={`cultivo-filter ${
                  activeCultivo === key ? "active" : ""
                }`}
                onClick={() => setActiveCultivo(key)}
              >
                <span className="cultivo-icon">{cultivos[key].icon}</span>
                <span className="cultivo-name">{cultivos[key].name}</span>
              </button>
            ))}
          </div>

          <div id="products" className="products-grid">
            {products
              .filter(
                (product) =>
                  activeCultivo === "all" || product.cultivo === activeCultivo
              ) // Mostrar todos si el filtro es "all"
              .map((product, index) => (
                <div
                  className="product-card"
                  key={index}
                  onClick={() => openProductDetail(product)}
                >
                  <div className="image-container_card">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="product-image_card"
                      onLoad={handleImageLoad}
                      loading="lazy"
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
                    <p
                      className="product-description"
                      style={{ color: "#0a9d6d" }}
                    >
                      {product.cultivo}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="product-detail-modal"
          onClick={(e) => e.target === e.currentTarget && closeProductDetail()}
          onKeyDown={(e) => e.key === "Escape" && closeProductDetail()}
          tabIndex={0} // Necesario para que funcione el keydown
        >
          <div className="modal-content_products">
            <div className="product-detail-grid">
              <h2>{selectedProduct.title}</h2>
              <div className="product-images">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="main-image"
                />
              </div>

              <div className="product-info">
                <div className="specifications">
                  <div className="spec-item">
                    <span className="spec-label">Tipo de cultivo:</span>
                    <span className="spec-value">
                      {selectedProduct.cultivo}
                    </span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">THC:</span>
                    <div className="spec-bar">
                      <div
                        className="bar-fill"
                        style={{ width: `${selectedProduct.thc || "60%"}` }}
                      ></div>
                    </div>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">CBD:</span>
                    <div className="spec-bar">
                      <div
                        className="bar-fill"
                        style={{ width: `${selectedProduct.cbd || "15%"}` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="description">
                  <h3>Costo productivo</h3>
                  <p>
                    {selectedProduct.fullDescription ||
                      selectedProduct.description}
                  </p>
                  <div className="image-info-container">
                    <img
                      src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1741882724/ALTA_z2qfwt.png"
                      alt={selectedProduct.title}
                      className="product-image_products"
                    />
                    <div className="info-section">
                      <div className="section-item">
                        <strong>Parte alta</strong>
                        <p>
                          Son las flores más expuestas a la luz y suelen ser las
                          más densas y potentes.
                        </p>
                        <p>Cada 5gr $50.000</p>
                      </div>
                      <div className="section-item">
                        <strong>Parte media</strong>
                        <p>
                          Estas flores reciben luz indirecta y tienen un tamaño
                          intermedio.
                        </p>
                        <p>Cada 5gr $30.000</p>
                      </div>
                      <div className="section-item">
                        <strong>Parte baja</strong>
                        <p>
                          Son los cogollos menos desarrollados, ya que reciben
                          menos luz.
                        </p>
                        <p>Cada 5gr $15.000</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className="whatsapp-button_products"
                  onClick={() =>
                    window.open(
                      `https://wa.me/+549TU_NUMERO?text=Hola, quiero más información sobre: ${selectedProduct.title}`
                    )
                  }
                >
                  Consultar por WhatsApp
                </button>
              </div>
              <button
                className="close-modal_products"
                onClick={() => setSelectedProduct(null)}
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsSection;
