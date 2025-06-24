// src/components/VideoPlayer.jsx
import React, { useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';



const VideoPlayer = ({ filename, onEnded, index, playing=false}) => {
  const playerRef = useRef(null);


  const videoUrl = `${filename}`;

    useEffect(() => {
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
            onEnded && onEnded();
          }}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
          config={{
            file: {
              attributes: {
                preload: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
