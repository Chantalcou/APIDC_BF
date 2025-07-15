// LearnWithUs.jsx
import React from "react";
import "./LearnWithUs.css";

const trainingsData = [
  {
    title: "",
    subtitle: "",
    // date: "24 DE JULIO 2025",
    image:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/v1752586473/WhatsApp_Image_2025-07-14_at_3.16.26_PM_1_psenun.jpg",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSfMxYKxAjCIKn8L-kwlwhKO8ervAWdf9DL65Yu9r3MRFoOAlA/viewform?usp=header",
  },
  {
    title: "",
    subtitle: "",
    // date: "23 DE AGOSTO 2025",
    image:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/v1752591009/WhatsApp_Image_2025-07-15_at_11.37.49_AM_zyg75b.jpg",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSe_ZrM875U6pam1I9hJ97PO_hgEOJNTHgPr9bhbRDGHwxsyEQ/viewform?usp=dialog",
  },
  {
    title: "",
    subtitle: "",
    // date: "23 DE AGOSTO 2025",
    image:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/v1752586473/WhatsApp_Image_2025-07-14_at_3.16.26_PM_db6uyl.jpg",
    link: "https://docs.google.com/forms/d/e/1FAIpQLScVeo8TLldryp9FjPZksKw0eZ9UZMcku2_HYZ3nfUN3JlTwDA/viewform?usp=header",
  },
];

const LearnWithUs = () => {
  return (
    <section className="learn-section">
      <div className="section-header_learn">
        <h2 className="section-title_learn">Capacitaciones Técnicas</h2>
      </div>

      <div className="trainings-grid">
        {trainingsData.map((training, index) => (
          <article
            key={index}
            className="learn-card"
            style={{ backgroundImage: `url(${training.image})` }}
          >
            <div className="learn-card__overlay"></div>
            <div className="learn-card__content">
              <div className="card-meta">
                <span className="training-date">{training.date}</span>
              </div>
              <div className="card-body">
                <h3 className="training-title">{training.title}</h3>
                <p className="training-subtitle">{training.subtitle}</p>
              </div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={training.link}
                className="enroll-button"
              >
                Inscribirse
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LearnWithUs;
