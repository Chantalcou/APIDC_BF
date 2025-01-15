import React, { useState, useRef } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./GestionarReprocan.css";

const GestionarReprocan = () => {
  const [videoVisible, setVideoVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handleVideoClick = () => {
    setVideoVisible(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <Container fluid className="gestionar-reprocan-container my-5 py-5 mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="custom-shadow">
            <Card.Body className="card-body_gestionarReprocan">
              <h3 className="mb-4">
                ¿Qué es y cómo gestionar tu{" "}
                <span style={{ color: "#0a9d6d" }}>REPROCAN</span>?
              </h3>

              <p className="text-muted mb-4">
                En este video te explicamos de manera fácil y rápida cómo
                gestionar tu REPROCAN. ¡Mirá el tutorial!
              </p>
              <div className="video-container">
                {videoVisible ? (
                  <div className="video-wrapper">
                    <video
                      ref={videoRef}
                      className="video-player shadow"
                      autoPlay
                      muted={isMuted}
                      controls
                    >
                      <source
                        src="https://res.cloudinary.com/dqgjcfosx/video/upload/v1736431214/GetstartedwithScript_onnucs.mp4"
                        type="video/mp4"
                      />
                      Tu navegador no soporta la etiqueta de video.
                    </video>
                    <Button
                      variant="secondary"
                      className="mute-button"
                      onClick={toggleMute}
                    >
                      {isMuted ? "🔇" : "🔊"}
                    </Button>
                  </div>
                ) : (
                  <img
                    className="video-thumbnail img-fluid rounded shadow"
                    src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1736429562/noname_hbtib4.jpg"
                    alt="Video tutorial REPROCAN"
                    onClick={handleVideoClick}
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GestionarReprocan;
