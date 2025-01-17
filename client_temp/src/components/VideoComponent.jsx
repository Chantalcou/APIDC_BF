import React from "react";
import ReactPlayer from "react-player";
import "./VideoComponent.css";

const VideoComponent = () => {
  const isMobile = window.innerWidth <= 768;

  const videoUrl =
    "https://res.cloudinary.com/dqgjcfosx/video/upload/w_720,q_auto,f_auto/v1234567/7667357-uhd_3840_2160_30fps_nm24my.mp4";
  const imageUrl =
    "https://res.cloudinary.com/dqgjcfosx/image/upload/v1726319618/pexels-alesiakozik-8327011_en2sjo.jpg"; // URL de la imagen estática

  return (
    <div className="video-container">
      {/* En dispositivos móviles, mostramos una imagen estática */}
      {isMobile ? (
        <img src={imageUrl} alt="Imagen estática" width="100%" />
      ) : (
        <ReactPlayer
          url={videoUrl} // Video URL para escritorio
          playing={false} // No reproducir automáticamente
          controls={true} // Mostrar controles
          width="100%" // Ancho completo
          height="auto" // Altura automática
          muted={true} // Silenciar para permitir reproducción automática en mobile si necesario
        />
      )}
    </div>
  );
};

export default VideoComponent;
