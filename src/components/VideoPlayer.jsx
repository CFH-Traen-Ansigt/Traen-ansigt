// src/components/VideoPlayer.jsx
import React, { useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({
  filename,
  onEnded,
  index,
  playing = false,
  onVideoStarted,
}) => {
  const playerRef = useRef(null);

  const videoUrl = `${filename}`;

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(0);
    }
  }, [index]);

  // When playback begins -> unmute video again
  useEffect(() => {
    if (playing && playerRef.current) {
      const internal = playerRef.current.getInternalPlayer();
      if (internal) {
        setTimeout(() => {
          internal.muted = false; // unmute after Safari-allowed autoplay
        }, 300);
      }
    }
  }, [playing]);

  return (
    <div
      className="w-screen h-screen bg-black flex items-center justify-center"
      style={{ position: "relative" }}
    >
      {/* Video player */}
      <div style={{ position: "absolute", inset: 0 }}>
        <ReactPlayer
          key={index}
          ref={playerRef}
          url={videoUrl}
          playing={playing}
          controls={false}
          playsInline={true}
          muted={true}
          onStart={() => {
            if(onVideoStarted) onVideoStarted();
          }}
          onEnded={() => {
            onEnded && onEnded();
          }}
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
          config={{
            file: {
              attributes: {
                preload: "auto",
                playsInline: true,
                crossOrigin: "anonymous",
                muted: true
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
