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
  const [visualSettings] = useState(localStorage.getItem("visualNeglect") === "Højre" || false);

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

  const currentVideo = program.length > 0 ? `${program[currentIndex].id}.mp4` : null;

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
  const WebcamComponent = <Webcam audio={false} mirrored={true} videoConstraints={videoConstraints} style={videoStyle} />;

  return (
    <main style={{ backgroundColor: "black" }}>
      <VideoPlayer filename={currentVideo} onEnded={handeVideoEnd} index={currentIndex} playing={playing} />

      <div
        className="video-controls"
        style={{ position: "absolute", left: "calc(50% - 126.34px)", bottom: "5%", display: "flex", gap: "20px", justifyContent: "center", alignItems: "center" }}
      >
        <button
          onClick={prevVideo}
          disabled={currentIndex === 0}
          style={{ background: `no-repeat center url(../assets/backward-icon.svg)`, width: "71.35px", height: "45.49px", opacity: "50%" }}
        ></button>
        <div>
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
            {isEnded ? <IoMdPlay size={40} /> : playing ? <FaPause size={40} /> : <IoMdPlay size={40} />}
          </button>
        </div>
        <button
          onClick={nextVideo}
          disabled={currentIndex === program.length - 1}
          style={{ background: `no-repeat center url(../assets/backward-icon.svg)`, width: "71.35px", height: "45.49px", opacity: "50%", transform: "rotate(180deg)" }}
        ></button>
      </div>

      <div //afbryd knap
        style={{
          position: "absolute",
          top: "20px",
          ...(visualSettings ? { left: "20px" } : { right: "20px" }),
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
          <IoMdClose size={30} style={{ fontWeight: "bold" }} />
          <span>Afbryd program</span>
        </button>
      </div>
      <div
        className={`absolute bottom-5 ${visualSettings ? "left-5" : "right-5"} border-radius-5 overflow-hidden`}
        style={{
          height: "auto",
          width: "25%",
        }}
      >
        {WebcamComponent}
      </div>
    </main>
  );
};

export default VideoScreen;
