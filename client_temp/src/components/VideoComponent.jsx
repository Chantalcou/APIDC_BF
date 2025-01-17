import { useEffect, useRef } from "react";

const VideoComponent = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay bloqueado:", error);
      });
    }
  }, []);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        playsInline
        muted
        preload="auto"
        controls
        style={{ width: "100%", height: "auto" }}
      >
        <source
          src="https://res.cloudinary.com/dqgjcfosx/video/upload/w_480,q_auto,f_auto/v1234567/7667357-uhd_3840_2160_30fps_nm24my.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoComponent;
