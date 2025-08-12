import React from "react";
import "./CannabisBenefits.css";

// -----------------------------------------------------------------------------
// DATA CONFIG
// -----------------------------------------------------------------------------

const headerData = {
  title: "Beneficios Medicinales del Cannabis",
  date: "12 ABR 2024",
  intro:
    "El cannabis medicinal ofrece una amplia gama de beneficios terapéuticos respaldados por evidencia científica. Estas son algunas aplicaciones terapéuticas comprobadas:",
};

const benefitsInfo = [
  {
    heading: "Alivio del dolor crónico",
    text: "Eficaz en dolor neuropático, artritis y esclerosis múltiple según estudios clínicos.",
    icon: "analgesia",
  },
  {
    heading: "Reducción de inflamación",
    text: "Los cannabinoides CBD y THC demuestran propiedades antiinflamatorias en condiciones como artritis reumatoide.",
    icon: "antiinflamatorio",
  },
  {
    heading: "Control de náuseas",
    text: "Recomendado para pacientes oncológicos bajo quimioterapia y enfermedades gastrointestinales.",
    icon: "nauseas",
  },
  {
    heading: "Mejora de la calidad del sueño",
    text: "Variedades específicas favorecen un descanso profundo en pacientes con trastornos del sueño.",
    icon: "sueño",
  },
  {
    heading: "Reducción de ansiedad",
    text: "En dosis controladas, muestra efectos ansiolíticos en diversos estudios.",
    icon: "ansiedad",
  },
  {
    heading: "Estimulación del apetito",
    text: "Beneficioso en casos de VIH/SIDA y tratamientos oncológicos con pérdida de peso asociada.",
    icon: "apetito",
  },
];

const scientificSources = [
  {
    title: "Revista de la Asociación Médica Americana",
    description: "Estudio sobre cannabis y dolor crónico (2021)",
    link: "https://jamanetwork.com/journals/jama/article-abstract/2783178"
  },
  {
    title: "British Journal of Pharmacology",
    description: "Propiedades antiinflamatorias de cannabinoides",
    link: "https://bpspubs.onlinelibrary.wiley.com/doi/abs/10.1111/j.1476-5381.2011.01238.x"
  },
  {
    title: "Instituto Nacional del Cáncer (EE.UU.)",
    description: "Cannabis para síntomas relacionados con cáncer",
    link: "https://www.cancer.gov/about-cancer/treatment/cam/hp/cannabis-pdq"
  },
  {
    title: "Journal of Clinical Sleep Medicine",
    description: "Cannabis y trastornos del sueño (2020)",
    link: "https://jcsm.aasm.org/doi/10.5664/jcsm.8988"
  }
];

const CannabisBenefitsSection = () => (
  <section className="cb-section">
    {/* Header */}
    <div className="cb-header">
      <h2 className="cb-title">{headerData.title}</h2>
      <span className="cb-date">{headerData.date}</span>
      <p className="cb-intro">{headerData.intro}</p>
    </div>

    {/* Info Cards Grid */}
    <div className="cb-info-grid">
      {benefitsInfo.map((b, idx) => (
        <article key={idx} className="cb-info-card">
          <div className={`cb-card-icon icon-${b.icon}`}></div>
          <h3 className="cb-card-title">{b.heading}</h3>
          <p className="cb-card-text">{b.text}</p>
        </article>
      ))}
    </div>

    {/* Fuentes científicas */}
    <div className="cb-sources">
      <h3 className="cb-sources-title">Fuentes Científicas</h3>
      <p className="cb-sources-subtitle">Estudios médicos que respaldan estos beneficios:</p>
      
      <div className="sources-grid">
        {scientificSources.map((source, index) => (
          <a key={index} href={source.link} target="_blank" rel="noopener noreferrer" className="source-card">
            <div className="source-icon">📚</div>
            <div className="source-content">
              <h4>{source.title}</h4>
              <p>{source.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default CannabisBenefitsSection;