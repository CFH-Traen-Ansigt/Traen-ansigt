// src/components/VideoPlayer.jsx
import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { IoMdPlay } from "react-icons/io";
import { FaPause } from "react-icons/fa";



const VideoPlayer = ({ filename, onEnded, index }) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const togglePlayPause = () => {

    if (isEnded) {
      playerRef.current.seekTo(0);
      setIsEnded(false);
    }

    setPlaying(prev => !prev);
  };

  const videoUrl = `/assets/videos/${filename}`;

    useEffect(() => {
     setPlaying(true);
     setIsEnded(false);
     if(playerRef.current) {
       playerRef.current.seekTo(0);
     }
   }, [index]);

  return (
    <div
      className="w-screen h-screen bg-black flex items-center justify-center"
      style={{ position: 'relative' }}
    >
      {/* Video player */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          playing={playing}
          controls={false}
          onEnded={() => {
            setPlaying(false)
            setIsEnded(true)
            onEnded && onEnded();
          }}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </div>

      {/* Custom play/pause button */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <button
          onClick={togglePlayPause}
          style={{
            background: 'rgba(144, 26, 54, 0.5)',
            color: 'white',
            padding: '15px 15px',
            borderRadius: '10px',
            fontSize: '18px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {isEnded ? <IoMdPlay size={40} /> : playing ? <FaPause size={40} /> : <IoMdPlay size={40} />}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
