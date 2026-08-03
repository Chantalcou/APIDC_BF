import React, { useState } from "react";
import "./GeneticasDisponibles.css";

const materiaVegetal = [
  {
    id: 1,
    nombre: "DOSI-2",
    imagen:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/f_jpg,q_auto/v1781878293/IMG_6612_qxguiu.jpg",
    tipo: "THC",
    disponibilidad: "Disponible",
    aromaSabor:
      "Una mezcla de notas dulces y terrosas, con matices intensos a moras maduras y combustible (diésel).",
    efecto:
      "Altamente relajante y sedante, ideal para combatir el estrés y el insomnio.",
  },
  {
    id: 2,
    nombre: "Juanita 910",
    imagen:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/v1779289095/WhatsApp_Image_2026-05-20_at_11.55.41_AM_unr9mk.jpg",
    tipo: "THC",
    disponibilidad: "Disponible",
    aromaSabor:
      "Combina un trasfondo cítrico, de tipo Haze y limón, con matices frutales y terrosos, y un toque penetrante a hachís y combustible (diésel).",
    efecto:
      "Provoca un subidón cerebral muy limpio, claro y eufórico.",
  },
  {
    id: 3,
    nombre: "Tropical Kush",
    imagen:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/v1779289095/WhatsApp_Image_2026-05-20_at_11.56.00_AM_mnmmlr.jpg",
    tipo: "THC",
    disponibilidad: "Disponible",
    aromaSabor:
      "Ofrece una compleja experiencia sensorial. Presenta un dulzor tropical con un fondo clásico de Kush terroso, pimienta, pino y un sutil toque a diésel.",
    efecto: "Es principalmente relajante y analgésico.",
  },
  {
    id: 5,
    nombre: "Purple Karma",
    imagen: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1784648044/puple_tuxehi.png",
    tipo: "THC",
    disponibilidad: "disponible",
    aromaSabor:
      "Posee un perfil de terpenos sumamente particular y complejo, en el que predominan los matices terrosos, a hachís, cuero y almizcle, acompañados por un trasfondo dulce y frutal en el paladar.",
    efecto:
      "Ofrece una experiencia versátil y un alto perfil terapéutico. Genera una relajación corporal profunda, combinada con un estado introspectivo y sereno.",
  },
  {
    id: 6,
    nombre: "Painted Lady",
    imagen: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1784647715/painted_qzqesb.png",
    tipo: "THC",

    // Para que aparezca el cartel negro:
    disponibilidad: "No disponible",

    aromaSabor:
      "Su perfil de terpenos, rico en mirceno y limoneno, desprende una compleja fragancia a hierba de limón, miel y flores frescas.",
    efecto:
      "Proporciona una sensación inmediata de claridad mental, calma y relajación.",
  },
   {
    id: 6,
    nombre: "Melon Punch",
    imagen: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1784647715/painted_qzqesb.png",
    tipo: "THC",

    // Para que aparezca el cartel negro:
    disponibilidad: "disponible",

    aromaSabor:
      "Perfil de Sabor y Aroma: Ofrece una verdadera explosión dulce en el paladar. Destacan de manera muy nítida las notas de sandía caramelizada, melón maduro y bayas silvestres, acompañadas por un sutil trasfondo herbal, terroso y un toque gaseoso (diesel) al exhalar.",
    efecto:
      "Proporciona una sensación inmediata de claridad mental, calma y relajación.",
  },
];

const aceites = [
  {
    id: 1,
    nombre: "Aceite Full Spectrum Quimiotipo I",
    imagen:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/v1784643653/ChatGPT_Image_21_jul_2026_11_20_05_a.m._u4pofv.png",
    tipo: "(Predominancia THCA)",
    disponibilidad: "Disponible",
    descripcion:
      "Extracto de cannabis de espectro completo elaborado a partir de plantas seleccionadas y caracterizadas como quimiotipo I. Se distingue por la predominancia de cannabinoides ácidos, principalmente THCA, acompañados por otros fitocannabinoides, terpenos y flavonoides naturalmente presentes en la planta. El proceso de elaboración está orientado a preservar la composición fitoquímica original del material vegetal.",
  },
  {
    id: 2,
    nombre: "Aceite Full Spectrum Quimiotipo II",
    imagen:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/v1784644234/ChatGPT_Image_21_jul_2026_11_26_41_a.m._yg1frg.png",
    tipo: "(THCA-CBDA balanceado)",
    disponibilidad: "Disponible",
    descripcion:
      "Extracto de cannabis de espectro completo obtenido de plantas seleccionadas correspondientes a quimiotipo II. Presenta una expresión equilibrada de cannabinoides ácidos, principalmente THCA y CBDA, junto con el perfil natural de cannabinoides menores, terpenos y flavonoides característicos de la genética utilizada.",
  },
  {
    id: 3,
    nombre: "Aceite Full Spectrum Quimiotipo III",
    imagen:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/v1784644234/ChatGPT_Image_21_jul_2026_11_26_41_a.m._yg1frg.png",
    tipo: "(Predominancia CBDA)",
    disponibilidad: "Disponible",
    descripcion:
      "Extracto de cannabis de espectro completo elaborado a partir de plantas seleccionadas de quimiotipo III. Se caracteriza por una predominancia de CBDA y bajo contenido de THC, conservando además otros cannabinoides ácidos, terpenos y metabolitos secundarios presentes en la planta.",
  },
];

const crearClaseEstado = (disponibilidad) => {
  return disponibilidad
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
};

const GeneticasDisponibles = () => {
  const [categoriaActiva, setCategoriaActiva] = useState("materia");

  const productos =
    categoriaActiva === "materia" ? materiaVegetal : aceites;

  return (
    <section className="genetics-section">
      <div className="genetics-container">
        <h1 className="genetics-title">Tus Genéticas</h1>

        <p className="genetics-subtitle">
          Espacio exclusivo para socios APIDC.
        </p>

        <div className="catalog-tabs">
          <button
            type="button"
            className={`catalog-tab ${
              categoriaActiva === "materia" ? "active" : ""
            }`}
            onClick={() => setCategoriaActiva("materia")}
          >
            Materia vegetal
          </button>

          <button
            type="button"
            className={`catalog-tab ${
              categoriaActiva === "aceites" ? "active" : ""
            }`}
            onClick={() => setCategoriaActiva("aceites")}
          >
            Aceites
          </button>
        </div>

        <div className="genetics-grid">
          {productos.map((item) => {
            const noDisponible =
              item.disponibilidad.toLowerCase() === "no disponible";

            const claseEstado = crearClaseEstado(item.disponibilidad);

            return (
              <article
                key={`${categoriaActiva}-${item.id}`}
                className={`genetics-card ${
                  noDisponible ? "card-no-disponible" : ""
                }`}
              >
              <div className="card-image-wrapper">
                  {item.imagen ? (
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="card-image"
                      loading="lazy"
                      style={{
                        objectPosition: item.posicionImagen || "center",
                        transform: `scale(${item.escalaImagen || 1})`,
                      }}
                    />
                  ) : (
                    <div className="card-image-placeholder">
                      <span>Imagen próximamente</span>
                    </div>
                  )}

                  {noDisponible && (
                    <div className="unavailable-overlay">
                      <div className="unavailable-box">
                        <span className="unavailable-title">
                          No disponible
                        </span>

                        <span className="unavailable-text">
                          Temporalmente sin stock
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="card-content">
                  <h3 className="card-title">{item.nombre}</h3>

                  <div className="card-detail">
                    <span className="detail-label">Tipo:</span>
                    <span>{item.tipo}</span>
                  </div>

                  <div className="card-detail">
                    <span className="detail-label">Estado:</span>

                    <span
                      className={`status-badge status-${claseEstado}`}
                    >
                      {item.disponibilidad}
                    </span>
                  </div>

                  {categoriaActiva === "materia" ? (
                    <div className="descripcion">
                      {item.aromaSabor && (
                        <p>
                          <strong>Aroma y sabor:</strong>{" "}
                          {item.aromaSabor}
                        </p>
                      )}

                      {item.efecto && (
                        <p>
                          <strong>Efecto:</strong> {item.efecto}
                        </p>
                      )}
                    </div>
                  ) : (
                    item.descripcion && (
                      <p className="descripcion">
                        {item.descripcion}
                      </p>
                    )
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GeneticasDisponibles;