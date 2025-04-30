// LearnWithUs.jsx
import React from "react";
import "./LearnWithUs.css";

const trainingsData = [
  {
    title: "",
    subtitle: "",
    date: "15 DE MAYO 2025",
    image:
      "https://res.cloudinary.com/dqgjcfosx/image/upload/v1746019968/tama%C3%B1o-chico_w0os5l.jpg",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSfYiD8Jf5buuzb_jF7OYIwxtPg5QbtsQ43nYAtjw8UfwCCsoA/viewform",
  },
  // {
  //   title: "",
  //   subtitle: "",
  //   date: "22 NOV 2024",
  //   image: "https://res.cloudinary.com/dqgjcfosx/image/upload/v1746019968/tama%C3%B1o-chico_w0os5l.jpg",
  //   link: "#"
  // },
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
