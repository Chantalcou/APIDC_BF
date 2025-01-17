import React from "react";
import ReactPlayer from "react-player";

const VideoComponent = () => {
  const isMobile = window.innerWidth <= 768;

  const videoUrl = isMobile
    ? "https://res.cloudinary.com/dqgjcfosx/video/upload/w_360,q_50,f_auto/v1234567/7667357-uhd_3840_2160_30fps_nm24my.mp4"
    : "https://res.cloudinary.com/dqgjcfosx/video/upload/w_720,q_auto,f_auto/v1234567/7667357-uhd_3840_2160_30fps_nm24my.mp4";

  return (
    <ReactPlayer
      url={videoUrl} // URL dinámica según el ancho del dispositivo
      playing={false} // No se reproduce automáticamente
      controls={true} // Mostrar controles
      width="100%" // Ancho completo
      height="auto" // Altura automática
      muted={true} // Silenciar para permitir reproducción automática en mobile si necesario
    />
  );
};

export default VideoComponent;
