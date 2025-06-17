import React, { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { useParams } from "react-router-dom";
import { supabase } from "../DB/supabaseClient";
import Webcam from "react-webcam";
import { IoMdPlay, IoMdClose } from "react-icons/io";
import { FaPause } from "react-icons/fa";

const VideoScreen = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    async function getProgram() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Failed to get user", error);
        return;
      }
      const { data, error: fetchError } = await supabase
        .from("ExercisesOnPrograms")
        .select("repetitions, order, Programs (user_id), Exercises (id, name)")
        .eq("program_id", id)
        .eq("Programs.user_id", user.id)
        .order("order", { ascending: true });

      if (fetchError) {
        console.error("Error fetching program:", fetchError);
        return;
      }

      let programData = [];
      let introVideo = `/assets/intro-videos/intro`;
      programData.push({
        id: introVideo,
        name: "Intro Video",
      });
      data.forEach((item) => {
        programData.push({
          id: `/assets/intro-videos/vi0${item.Exercises.id}`,
          name: item.Exercises.name,
        });
        for (let i = 0; i < item.repetitions; i++) {
          programData.push({
            id: `/assets/videos/v0${item.Exercises.id}`,
            name: item.Exercises.name,
          });
        }
      });

      setProgram(programData);
      setIsLoading(false);
    }
    getProgram();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("Fetched program:", program);

  const nextVideo = () => {
    if (currentIndex < program.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const prevVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleExit = () => {
    // Logic to handle exit, e.g., navigate back to the previous screen
    console.log("Exit button clicked");
    window.location.href = "/forside";
  };

  const handeVideoEnd = () => {
    setPlaying(false);
    nextVideo();
    setPlaying(true); // Set playing to true when moving to the next video
  };

  const togglePlayPause = () => {
    setPlaying(!playing);
    if (isEnded) {
      setIsEnded(false);
    }
  };

  const currentVideo =
    program.length > 0 ? `${program[currentIndex].id}.mp4` : null;

  //aspect ratio 4:3
  const videoConstraints = {
    width: 500,
    height: 375,
    facingMode: "user",
  };
  const videoStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "15px",
  };
  const WebcamComponent = (
    <Webcam
      audio={false}
      mirrored={true}
      videoConstraints={videoConstraints}
      style={videoStyle}
    />
  );

  return (
    <main>
      <VideoPlayer
        filename={currentVideo}
        onEnded={handeVideoEnd}
        index={currentIndex}
        playing={playing}
      />

      <div className="video-controls">
        <button onClick={prevVideo} disabled={currentIndex === 0}>
          ⏮️ Forrige
        </button>
        <button
          onClick={nextVideo}
          disabled={currentIndex === program.length - 1}
        >
          ⏭️ Næste
        </button>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
          <button
            onClick={togglePlayPause}
            style={{
              background: "rgba(144, 26, 54, 0.5)",
              color: "white",
              padding: "15px 15px",
              borderRadius: "10px",
              fontSize: "18px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {isEnded ? (
              <IoMdPlay size={40} />
            ) : playing ? (
              <FaPause size={40} />
            ) : (
              <IoMdPlay size={40} />
            )}
          </button>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "#901A36", // transparent red
          color: "white",
          padding: "10px 15px",
          borderRadius: "8px",
          zIndex: 1000,
          opacity: 0.8,
        }}
      >
        <button
          onClick={handleExit}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: "bold",
          }}
          aria-label="Luk"
        >
          <IoMdClose size={30} style={{ fontWeight: "bold"}} />
          <span>Afbryd program</span>
        </button>
      </div>
      <div className="absolute bottom-10 right-10 border-radius-5 overflow-hidden ">
        {WebcamComponent}
      </div>
      <div>
        <p>{currentIndex}</p>
      </div>
    </main>
  );
};

export default VideoScreen;

/* 
  <main>
    <button class="top-right close-v">
      <div id=" close-vid">
        <img
          class="img-close"
          src="../assets/fat-close-btn-icon.svg"
          alt="Næste video"
        />
      </div>
      <p class="close-p">Afbryd</p>
    </button>

    <div class="top-left con-1">
      <h1>Repetition</h1>
      <p>4/5</p>
    </div>

    <div class="top-left con-2">
      <h2>Øvelse</h2>
      <p>Rynk brynene</p>
    </div>

    <video id="background-video">
      <source src="../assets/videos/v003.mp4" type="video/mp4" />
      Din browser undersøtter ikke dette video format.
    </video>

    <div class="control-buttons">
      <button id="backward-button"
        ><img src="../assets/backward-icon.svg" alt="Forrige video" /></button
      >
      <button id="play-button"
        ><img src="../assets/play-btn-icon.svg" alt="Afspil" /></button
      >
      <button id="pause-button"
        ><img src="../assets/pause-btn-icon.svg" alt="Pause" /></button
      >
      <button id="forward-button"
        ><img src="../assets/forward-icon.svg" alt="Næste video" /></button
      >
    </div>

    <div class="container">
      <video id="video" autoplay></video>
    </div>
  </main>

  <style is:global>
    body,
    html {
      height: 100%;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      --main-font: "Manjari", sans-serif;
      --secondary-font: "Marmelad", sans-serif;
      --fw-b: 700;
      --fw-r: 400;
      --fw-t: 100;
      --fs-xs: 10px;
      --fs-s: 14px;
      --fs-small-card: 16px;
      --fs-m: 18px;
      --fs-ml: 24px;
      --fs-l: 30px;
      --fs-xl: 32px;
      --primary-color: #901a36;
      --secondary-color: #749e2e;
      --main-bg-color: #f9f7f4;
      --alternative-bg-color: #eaeaea;
      --font-color: #141414;
    }

    h1,h2 {
      color: var(--primary-color);
      font-family: var(--main-font);
      font-size: 30px;
      font-style: normal;
      font-weight: var(--fw-b);
      margin: 0;
      line-height: 1.2;
    }

    p {
      color: var(--sort);
      font-family: var(--main-font);
      font-size: 42px;
      font-style: normal;
      font-weight: 100;
      margin: 0;
      line-height: 1.2;
    }

    .close-p {
      color: #fff;
      text-align: center;
      font-family: var(--main-font);
      padding-top: 4px;
      font-size: var(--fs-l);
      font-style: normal;
      font-weight: var(--fw-b);
      line-height: normal;
    }

    #background-video {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
    }

    .container {
      position: fixed;
      bottom: 10px;
      right: 10px;
      width: 25%;
      max-width: 300px;
      border: 2px solid white;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    video {
      width: 100%;
      height: auto;
      transform: scaleX(-1);
    }

    button {
      border: none;
      background: none;
      opacity: 50%;
    }

    .control-buttons {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 20px;
      text-align: center;
    }

    #play-button,
    #pause-button {
      width: 98.20896px;
      height: 103px;
      background-color: var(--primary-color);
      border-radius: 6px;
      cursor: pointer;
    }

    #pause-button {
      display: none;
      cursor: pointer;
    }

    #forward-button,
    #backward-button {
      cursor: pointer;
    }
    .close-v {
      margin: 0;
      display: flex;
      height: 45px;
      padding: 10px 20px;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 1.5px;
      background: var(--primary-color);
      cursor: pointer;
    }

    .img-close {
      width: 32px;
      height: 32px;
    }

    .top-right {
      gap: 20px;
      position: absolute;
      top: 3%;
      right: 0;
      height: 62px;
      width: 267px;
      padding: 10px 20px;
      margin: 0;
      text-align: right;
      justify-content: flex-start;
    }

    .top-left {
      position: absolute;
      top: 3%;
      left: 0;
    }

    .con-1 h1,
    .con-1 p,
    .con-2 h1,
    .con-2 p {
      margin: 0;
      line-height: 1.2;
    }
    .con-1 {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      top: 21%;
      width: 197px;
      height: 91px;
      padding: 10px 30px;
      border-radius: 0px 6px 6px 0px;
      opacity: 0.8;
      background: rgba(249, 247, 244, 0.276);
      gap: 7px;
    }

    .con-2 {
      display: flex;
      padding: 10px 30px;
      flex-direction: column;
      align-items: flex-start;
      border-radius: 0px 6px 6px 0px;
      opacity: 0.8;
      background: rgba(249, 247, 244, 0.276);
      gap: 7px;
    }
    .control-buttons img {
      width: 100%;
      height: 50px;
    }
  </style> */
