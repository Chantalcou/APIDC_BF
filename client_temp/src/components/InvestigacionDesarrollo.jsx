import React from "react";
import { Helmet } from "react-helmet-async";
import "./InvestigacionDesarrollo.css";

const publicaciones = [
  {
    id: 1,
    tipo: "Publicación científica",
    fecha: "2026",
    institucion: "Universidad Nacional Arturo Jauretche · UNAJ",
    titulo: "Investigación en equinos",
    descripcion:
      "Trabajo de investigación publicado en las Actas del II Congreso Internacional de Cáñamo Industrial y Cannabis Medicinal, con participación de APIDC.",
    detalle:
      "El trabajo se encuentra publicado en la página 60 de las Actas del Congreso.",
    enlace:
      "https://rid.unaj.edu.ar/items/6aebbce8-e333-466a-b31c-cea0d0ab09eb",
  },
];

const lineasTrabajo = [
  {
    numero: "01",
    titulo: "Investigación aplicada",
    texto:
      "Desarrollo y participación en proyectos orientados a generar conocimiento y evidencia en torno al cannabis y sus derivados.",
  },
  {
    numero: "02",
    titulo: "Desarrollo científico",
    texto:
      "Articulación de conocimientos, procesos y herramientas para el desarrollo de nuevas líneas de trabajo e innovación.",
  },
  {
    numero: "03",
    titulo: "Vinculación académica",
    texto:
      "Trabajo colaborativo con universidades, instituciones científicas y equipos interdisciplinarios.",
  },
  {
    numero: "04",
    titulo: "Transferencia y cooperación",
    texto:
      "Construcción de vínculos que permiten trasladar el conocimiento científico hacia proyectos concretos y de impacto social.",
  },
];

const InvestigacionDesarrollo = () => {
  return (
    <>
      <Helmet>
        <title>Investigación y Desarrollo | APIDC</title>

        <meta
          name="description"
          content="Conocé las publicaciones científicas, proyectos de investigación y articulaciones académicas desarrolladas por APIDC."
        />
      </Helmet>

      <main className="id-page">
        {/* ==================================================
            HERO
        ================================================== */}

        <section className="id-hero">
          <div className="id-hero-decoration id-decoration-one"></div>
          <div className="id-hero-decoration id-decoration-two"></div>
          <div className="id-hero-decoration id-decoration-three"></div>

          <div className="id-container id-hero-grid">
            <div className="id-hero-content">
              <div className="id-eyebrow">
                <span className="id-eyebrow-dot"></span>
                Ciencia · Innovación · Desarrollo
              </div>

              <h1>
                Investigación
                <span> y Desarrollo</span>
              </h1>

              <p className="id-hero-description">
                Generamos conocimiento, desarrollamos proyectos y construimos
                vínculos con instituciones científicas y académicas para
                impulsar la investigación sobre cannabis y sus derivados.
              </p>

              <div className="id-hero-actions">
                <a href="#publicaciones" className="id-primary-button">
                  Ver publicaciones
                  <span>↓</span>
                </a>

                <a href="#proyectos" className="id-secondary-button">
                  Conocer proyectos
                </a>
              </div>
            </div>

            <div className="id-hero-visual">
              <div className="id-hero-card id-card-main">
                <span className="id-card-tag">
                  Investigación colaborativa
                </span>

                <div className="id-card-symbol">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <h2>
                  Ciencia que conecta
                  <br />
                  conocimiento e impacto.
                </h2>

                <p>
                  Universidad · Investigación · Salud · Desarrollo
                </p>
              </div>

              <div className="id-floating-card id-floating-one">
                <span className="id-floating-icon">+</span>

                <div>
                  <strong>Conocimiento</strong>
                  <small>Producción científica</small>
                </div>
              </div>

              <div className="id-floating-card id-floating-two">
                <span className="id-floating-icon">↗</span>

                <div>
                  <strong>Cooperación</strong>
                  <small>Trabajo interdisciplinario</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            MARQUEE
        ================================================== */}

        <div className="id-marquee">
          <div className="id-marquee-track">
            <span>INVESTIGACIÓN</span>
            <i>•</i>
            <span>CIENCIA</span>
            <i>•</i>
            <span>DESARROLLO</span>
            <i>•</i>
            <span>INNOVACIÓN</span>
            <i>•</i>
            <span>COOPERACIÓN</span>
            <i>•</i>
            <span>CONOCIMIENTO</span>
            <i>•</i>

            <span>INVESTIGACIÓN</span>
            <i>•</i>
            <span>CIENCIA</span>
            <i>•</i>
            <span>DESARROLLO</span>
            <i>•</i>
            <span>INNOVACIÓN</span>
            <i>•</i>
            <span>COOPERACIÓN</span>
            <i>•</i>
            <span>CONOCIMIENTO</span>
            <i>•</i>
          </div>
        </div>

        {/* ==================================================
            INTRO / LÍNEAS DE TRABAJO
        ================================================== */}

        <section className="id-lines-section">
          <div className="id-container">
            <div className="id-section-heading id-heading-split">
              <div>
                <span className="id-section-kicker">Nuestro enfoque</span>

                <h2>
                  Investigación con una mirada
                  <span> interdisciplinaria.</span>
                </h2>
              </div>

              <p>
                Desde APIDC promovemos espacios de investigación, desarrollo y
                cooperación que permitan vincular el conocimiento científico
                con necesidades concretas de la sociedad.
              </p>
            </div>

            <div className="id-lines-grid">
              {lineasTrabajo.map((linea) => (
                <article className="id-line-card" key={linea.numero}>
                  <div className="id-line-number">{linea.numero}</div>

                  <div className="id-line-divider"></div>

                  <h3>{linea.titulo}</h3>

                  <p>{linea.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            PUBLICACIONES
        ================================================== */}

        <section
          className="id-publications-section"
          id="publicaciones"
        >
          <div className="id-container">
            <div className="id-section-heading">
              <span className="id-section-kicker">
                Producción científica
              </span>

              <h2>
                Publicaciones
                <span> científicas</span>
              </h2>

              <p className="id-section-intro">
                Trabajos, investigaciones y producciones académicas en las que
                APIDC participa junto a investigadores e instituciones.
              </p>
            </div>

            <div className="id-publications-list">
              {publicaciones.map((publicacion) => (
                <article
                  className="id-publication-card"
                  key={publicacion.id}
                >
                  <div className="id-publication-side">
                    <span className="id-publication-index">
                      0{publicacion.id}
                    </span>

                    <div className="id-publication-type">
                      {publicacion.tipo}
                    </div>
                  </div>

                  <div className="id-publication-main">
                    <div className="id-publication-meta">
                      <span>{publicacion.fecha}</span>

                      <span className="id-meta-separator"></span>

                      <span>{publicacion.institucion}</span>
                    </div>

                    <h3>{publicacion.titulo}</h3>

                    <p>{publicacion.descripcion}</p>

                    <div className="id-publication-note">
                      <span className="id-note-line"></span>
                      {publicacion.detalle}
                    </div>
                  </div>

                  <div className="id-publication-action">
                    <a
                      href={publicacion.enlace}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="id-publication-link"
                    >
                      <span>Leer publicación</span>

                      <span className="id-publication-arrow">
                        ↗
                      </span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            PROYECTOS
        ================================================== */}

        <section className="id-projects-section" id="proyectos">
          <div className="id-container">
            <div className="id-projects-layout">
              <div className="id-projects-heading">
                <span className="id-section-kicker">
                  Articulación científico-tecnológica
                </span>

                <h2>
                  Proyectos que fortalecen
                  <span> la investigación.</span>
                </h2>

                <p>
                  APIDC acompaña iniciativas que permiten fortalecer
                  capacidades científicas, institucionales y tecnológicas.
                </p>
              </div>

              <article className="id-project-featured">
                <div className="id-project-top">
                  <span className="id-project-label">
                    Aval institucional
                  </span>

                  <span className="id-project-date">
                    12 · 08 · 2026
                  </span>
                </div>

                <div className="id-project-body">
                  <div className="id-project-number">
                    <small>Proyecto</small>
                    <strong>8002060300008UR</strong>
                  </div>

                  <h3>
                    Fortalecimiento de equipamiento científico y
                    tecnológico de la Universidad Nacional de Rosario
                  </h3>

                  <p>
                    APIDC otorgó su aval institucional al proyecto
                    presentado por la Dra. Vanina Cravero en el marco de
                    la Convocatoria para el Fortalecimiento de
                    Equipamiento Científico y Tecnológico de la
                    Universidad Nacional de Rosario.
                  </p>

                  <p>
                    La iniciativa propone la adquisición de un sistema
                    autónomo de generación eléctrica que permita
                    asegurar la continuidad operativa de las
                    instalaciones de la Sección Horticultura de la
                    Facultad de Ciencias Agrarias frente a
                    contingencias en el suministro eléctrico.
                  </p>

                  <p>
                    La propuesta se vincula directamente con los
                    proyectos y actividades que APIDC desarrolla en
                    colaboración con la Facultad de Ciencias Agrarias
                    de la UNR.
                  </p>
                </div>

                <div className="id-project-footer">
                  <div className="id-project-data">
                    <span>Institución</span>
                    <strong>
                      Facultad de Ciencias Agrarias · UNR
                    </strong>
                  </div>

                  <div className="id-project-data">
                    <span>Responsable del proyecto</span>
                    <strong>Dra. Vanina Cravero</strong>
                  </div>

                  <div className="id-project-data">
                    <span>Participación APIDC</span>
                    <strong>Aval institucional</strong>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ==================================================
            COLABORACIÓN
        ================================================== */}

        <section className="id-collaboration-section">
          <div className="id-container">
            <div className="id-collaboration-box">
              <div className="id-collaboration-shape"></div>

              <div className="id-collaboration-content">
                <span className="id-collaboration-eyebrow">
                  Construir conocimiento
                </span>

                <h2>
                  Investigación que crece
                  <br />
                  <span>a través de la colaboración.</span>
                </h2>

                <p>
                  Promovemos vínculos entre organizaciones,
                  universidades, profesionales e instituciones para
                  seguir ampliando las posibilidades de investigación
                  y desarrollo.
                </p>
              </div>

              <div className="id-collaboration-pill">
                APIDC
                <span>+</span>
                Ciencia
                <span>+</span>
                Comunidad
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default InvestigacionDesarrollo;