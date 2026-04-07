import React, { useMemo, useState } from "react";
import "./LearnWithUs.css";

const LearnWithUs = () => {
  const [activeTab, setActiveTab] = useState("EVENTOS");

  const HERO_IMAGE =
    "https://res.cloudinary.com/dqgjcfosx/image/upload/v1768229156/ChatGPT_Image_12_ene_2026_11_45_09_a.m._h2utsh.png";

  const events = [
    {
      id: "ev-amnistia-cine",
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1775569132/WhatsApp_Image_2026-04-07_at_10.00.25_AM_oatjma.jpg",
      year: "2026",
      title: "Amnistía Cannabis",
    },
    {
      id: "ev-2026-expo",
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1768309786/expo--_bwcq9n.png",
      year: "2026",
      title: "Expo Cannabis",
    },
    {
      id: "ev-2026-1",
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1772118518/ChatGPT_Image_26_feb_2026_11_55_29_a.m._lnusz2.png",
      year: "2026",
      title: "Evento 2026",
    },
    {
      id: "ev-2026-2",
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1772118518/ChatGPT_Image_26_feb_2026_12_01_58_p.m._cyio3a.png",
      year: "2026",
      title: "Evento 2026",
    },
    {
      id: "ev-2025-1",
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762354907/cannabis_3_-4_compressed_page-0001_akrngk.jpg",
      year: "2025",
      title: "Evento APIDC 2025",
    },
    {
      id: "ev-2025-2",
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1762354908/cannabis_3_-5_compressed_page-0001_aeq0gp.jpg",
      year: "2025",
      title: "Evento APIDC 2025",
    },
  ];

  const capacitaciones2025 = [
    {
      id: "cap-2025-1",
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1752586473/WhatsApp_Image_2025-07-14_at_3.16.26_PM_1_psenun.jpg",
      year: "2025",
      title: "Capacitación 2025",
    },
    {
      id: "cap-2025-2",
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1752591009/WhatsApp_Image_2025-07-15_at_11.37.49_AM_zyg75b.jpg",
      year: "2025",
      title: "Capacitación 2025",
    },
  ];

  const capacitaciones2026 = [
    {
      id: "cap-2026-1",
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1768236747/ChatGPT_Image_12_ene_2026_01_51_43_p.m._e5ppif.png",
      year: "2026",
      title: "Capacitación 2026",
    },
    {
      id: "cap-2026-2",
      image:
        "https://res.cloudinary.com/dqgjcfosx/image/upload/v1768237002/ChatGPT_Image_12_ene_2026_01_55_53_p.m._q7jtt7.png",
      year: "2026",
      title: "Capacitación 2026",
    },
  ];

  const events2026 = useMemo(
    () => events.filter((item) => item.year === "2026"),
    [events]
  );

  const events2025 = useMemo(
    () => events.filter((item) => item.year === "2025"),
    [events]
  );

  const renderPosterGrid = (items, altPrefix) => {
    return (
      <div className="poster-grid">
        {items.map((item) => (
          <article
            key={item.id}
            className="poster-card"
            data-year={item.year}
            aria-label={`${altPrefix} ${item.title}`}
          >
            <div className="poster-badge">
              <span>{item.year}</span>
            </div>

            <div className="poster-media">
              <img
                src={item.image}
                alt={`${altPrefix} ${item.title} ${item.year}`}
                className="poster-image"
                loading="lazy"
              />
            </div>
          </article>
        ))}
      </div>
    );
  };

  return (
    <div className="learn-page">
      <section className="learn-hero">
        <div className="learn-hero-inner">
          <div className="learn-hero-left">
            <span className="hero-kicker">APIDC</span>

            <h1 className="learn-hero-title">
              Cursos, capacitaciones
              <br />
              y eventos cannábicos
            </h1>

            <p className="learn-hero-subtitle">
              Espacios de formación, encuentros y actividades vinculadas al
              cannabis medicinal, la investigación y el desarrollo.
            </p>
          </div>

          <div
            className="learn-hero-right"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
            aria-hidden="true"
          />
        </div>
      </section>

      <section className="learn-tabs-section">
        <div className="learn-tabs">
          <button
            type="button"
            className={`learn-tab ${activeTab === "EVENTOS" ? "active" : ""}`}
            onClick={() => setActiveTab("EVENTOS")}
          >
            <span className="tab-title">Eventos</span>
            <span className="tab-subtitle">2025 / 2026</span>
          </button>

          <button
            type="button"
            className={`learn-tab ${activeTab === "CAP_2025" ? "active" : ""}`}
            onClick={() => setActiveTab("CAP_2025")}
          >
            <span className="tab-title">Capacitaciones</span>
            <span className="tab-subtitle">2025</span>
          </button>

          <button
            type="button"
            className={`learn-tab ${activeTab === "CAP_2026" ? "active" : ""}`}
            onClick={() => setActiveTab("CAP_2026")}
          >
            <span className="tab-title">Capacitaciones</span>
            <span className="tab-subtitle">2026</span>
          </button>
        </div>
      </section>

      {activeTab === "EVENTOS" && (
        <>
          <section className="content-section">
            <div className="content-container">
              <div className="section-heading">
                <h2>Eventos cannábicos Argentina 2026</h2>
              </div>
              {renderPosterGrid(events2026, "Evento")}
            </div>
          </section>

          <section className="content-section content-section-soft">
            <div className="content-container">
              <div className="section-heading">
                <h2>Eventos cannábicos APIDC 2025</h2>
              </div>
              {renderPosterGrid(events2025, "Evento")}
            </div>
          </section>
        </>
      )}

      {activeTab === "CAP_2025" && (
        <section className="content-section">
          <div className="content-container">
            <div className="section-heading">
              <h2>Capacitaciones 2025</h2>
            </div>
            {renderPosterGrid(capacitaciones2025, "Capacitación")}
          </div>
        </section>
      )}

      {activeTab === "CAP_2026" && (
        <section className="content-section">
          <div className="content-container">
            <div className="section-heading">
              <h2>Capacitaciones 2026</h2>
              <p>Próximamente</p>
            </div>
            {renderPosterGrid(capacitaciones2026, "Capacitación")}
          </div>
        </section>
      )}
    </div>
  );
};

export default LearnWithUs;