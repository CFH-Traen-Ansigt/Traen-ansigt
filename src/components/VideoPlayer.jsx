import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({
  filename,
  index,
  playing,
  onCanPlay,
  onEnded,
  userPaused,
  manualPlay,
}) => {
  const playerRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Reset ready when video changes
  useEffect(() => {
    setReady(false);
  }, [index]);

 useEffect(() => {
    if (ready && !userPaused && !manualPlay) {
      const timer = setTimeout(() => {
        const internal = playerRef.current?.getInternalPlayer();
        if (!internal) return;
        internal.muted = false;
        if (onCanPlay) onCanPlay();
      }, 1600);

      return () => clearTimeout(timer);
    } else if (ready && !userPaused && manualPlay) {
      // immediately unmute for manual play
      const internal = playerRef.current?.getInternalPlayer();
      if (internal) internal.muted = false;
      if (onCanPlay) onCanPlay();
    }
  }, [ready, userPaused, manualPlay, onCanPlay]);

  return (
    <div
      className="w-screen h-screen bg-black flex items-center justify-center"
      style={{ position: "relative" }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <ReactPlayer
          key={index}
          ref={playerRef}
          url={filename}
          playing={playing && !userPaused}
          muted={true} // always start muted
          controls={false}
          onReady={() => setReady(true)}
          onEnded={() => onEnded && onEnded()}
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
          config={{
            file: {
              attributes: {
                preload: "auto",
                playsInline: true,
                muted: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
