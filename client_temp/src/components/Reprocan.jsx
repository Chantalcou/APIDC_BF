import { useState, useRef } from 'react';
import YouTube from 'react-youtube';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import './Reprocan.css';

const Reprocan = () => {
  const [isMuted, setIsMuted] = useState(true);
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
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="reprocan-section">
    {/* Nuevo título agregado */}
    <div className="reprocan-header">
      <h1>¿Cómo gestiono mi REPROCAN?</h1>
      {/* <p className="subtitle">Optimiza tus procesos con nuestra guía experta</p> */}
    </div>
    <div className="video-container_reprocan">
      <YouTube
        videoId="NyaSejlZka8"
        opts={opts}
        onReady={onReady}
        className="youtube-iframe"
      />
      <div className="controls">
        <button 
          onClick={toggleMute}
          className="audio-button"
          aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>
      </div>
    </div>
  );
};

export default Reprocan;
