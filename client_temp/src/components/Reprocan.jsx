import { useState, useRef } from 'react';
import YouTube from 'react-youtube';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import './Reprocan.css';

const Reprocan = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const playerRef = useRef(null);

  const opts = {
    height: '675',
    width: '1200',
    playerVars: {
      autoplay: 1, 
      mute: 1,
      modestbranding: 1,
      rel: 0,
      playsinline: 1
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
  };

  const toggleMute = () => {
    if (playerRef.current) {
      isMuted ? playerRef.current.unMute() : playerRef.current.mute();
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="reprocan-section">
      <div className="reprocan-header">
        <h1>¿Cómo gestiono mi REPROCANN?</h1>
      </div>
      <div className="video-container_reprocan">
        {!showVideo ? (
          <div className="video-thumbnail" onClick={() => setShowVideo(true)}>
            <img 
              src="https://res.cloudinary.com/dqgjcfosx/image/upload/v1743000715/reprocan-2_yjmqbg.webp" 
              alt="Miniatura del video"
              className="thumbnail-img"
            />
            <button className="play-button">▶</button>
          </div>
        ) : (
          <YouTube
            videoId="NyaSejlZka8"
            opts={opts}
            onReady={onReady}
            className="youtube-iframe"
          />
        )}
        {showVideo && (
          <div className="controls">
            <button 
              onClick={toggleMute}
              className="audio-button"
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reprocan;
