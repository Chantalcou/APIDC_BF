import React from "react";

const VideoComponent = () => {
  const isMobile = window.innerWidth <= 768;

  const videoUrl = isMobile
    ? "https://res.cloudinary.com/dqgjcfosx/video/upload/w_360,q_50,f_auto/v1234567/7667357-uhd_3840_2160_30fps_nm24my.mp4"
    : "https://res.cloudinary.com/dqgjcfosx/video/upload/w_720,q_auto,f_auto/v1234567/7667357-uhd_3840_2160_30fps_nm24my.mp4";

  return (
    <video
      playsInline
      autoPlay
      muted
      controls
      preload="auto"
      style={{ width: "100%", height: "auto" }}
    >
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoComponent;

