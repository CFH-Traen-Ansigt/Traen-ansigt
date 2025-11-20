import React, { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import ProgramCompletedModal from "../components/modals/ProgramCompletedModal";
import ExitProgramModal from "../components/modals/ExitProgramModal";
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
  const [visualSettings] = useState(
    localStorage.getItem("visualNeglect") === "Højre" || false
  );
  const [defaultSetting] = useState(
    localStorage.getItem("visualNeglect") === "Standard" || false
  );
  const [videoText] = useState(
    JSON.parse(localStorage.getItem("videoText")) || false
  );
  const [fade, setFade] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    if (!program || program.length === 0) return;

    const newVideo = `${program[currentIndex].id}.mp4`;

    setCurrentVideo(newVideo);
  }, [program, currentIndex]);

  // useEffect(() => {
  //   if (!currentVideo) return; // Prevent running before the first video loads

  //   setFade(false); // start fade-out
  //   const timeout = setTimeout(() => {
  //     setFade(true); // fade-in after short delay
  //   }, 1000); // fade duration in ms

  //   return () => clearTimeout(timeout);
  // }, [currentVideo]);

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
            currentRepetition: i,
            totalRepetitions: item.repetitions,
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
  // const prevVideo = () => {
  //   if (currentIndex > 0) {
  //     setCurrentIndex(currentIndex - 1);
  //   }
  // };

  const nextExercise = () => {
    let nextIndex = currentIndex + 1;
    while (
      nextIndex < program.length &&
      program[nextIndex].id === program[currentIndex].id
    ) {
      nextIndex++;
    }
    if (nextIndex < program.length) {
      setCurrentIndex(nextIndex);
    } if(nextIndex >= program.length){
      setIsEnded(true);
      setShowCompletedModal(true);
      setPlaying(false);
    }
  };

  const prevExercise = () => {
    let prevIndex = currentIndex - 1;
    while (
      prevIndex >= 0 &&
      program[prevIndex].id === program[currentIndex].id
    ) {
      prevIndex--;
    }
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
    }
  };

  const handleExit = () => {
    // Logic to handle exit, e.g., navigate back to the previous screen
    console.log("Exit button clicked");
    window.location.href = "/forside";
  };

  const handeVideoEnd = () => {
    setPlaying(false);

 

    if(currentIndex >= program.length - 1){
      setShowCompletedModal(true);
      setIsEnded(true);
      return;
    }
    setFade(false);
    setTimeout(() => {
    nextVideo();
    setFade(true);
    setPlaying(true);
    }, 1000);
  };

  const togglePlayPause = () => {
    setPlaying(!playing);
    if (isEnded) {
      setIsEnded(false);
    }
  };

  const exitModal = () => {
    setPlaying(false);
    setShowExitModal(true);
  }

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
    <main style={{ backgroundColor: "black" }}>
      <div
        className={`transition-opacity duration-700 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <ExitProgramModal
          title="Afbryd program"
          primaryButtonText="Fortsæt"
          secondaryButtonText="Afbryd"
          icon="/assets/exit-program-icon.svg"
          showModal={showExitModal}
          setShowModal={setShowExitModal}
          onAccept={() => {
            setShowExitModal(false);
            window.location.href = "/forside";
          }}
          onExit={() => {
            setShowExitModal(false);
          }}
        />
        <ProgramCompletedModal
          title="Gennemført program"
          primaryButtonText="Færdig"
          icon="/assets/ballons.svg"
          showModal={showCompletedModal}
          setShowModal={setShowCompletedModal}
          onAccept={() => {
            window.location.href = "/forside";
          }}
          onExit={() => {
            setShowCompletedModal(false);
          }}
        />
        <VideoPlayer
          filename={currentVideo}
          onEnded={handeVideoEnd}
          index={currentIndex}
          playing={playing}
        />
      </div>
      <div
        className="video-controls"
        style={{
          position: "absolute",
          left: "calc(50% - 126.34px)",
          bottom: "5%",
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={prevExercise}
          disabled={currentIndex === 0}
          style={{
            background: `no-repeat center url(../assets/backward-icon.svg)`,
            width: "71.35px",
            height: "45.49px",
            opacity: "50%",
          }}
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
            {isEnded ? (
              <IoMdPlay size={40} />
            ) : playing ? (
              <FaPause size={40} />
            ) : (
              <IoMdPlay size={40} />
            )}
          </button>
        </div>
        <button
          onClick={nextExercise}
          disabled={currentIndex === program.length - 1}
          style={{
            background: `no-repeat center url(../assets/backward-icon.svg)`,
            width: "71.35px",
            height: "45.49px",
            opacity: "50%",
            transform: "rotate(180deg)",
          }}
        ></button>
      </div>
      <div //afbryd knap
        style={{
          position: "absolute",
          top: "20px",
          ...(visualSettings ? { left: "30px" } : { right: "30px" }),
          backgroundColor: "#901A36", // transparent red
          color: "white",
          padding: "10px 15px",
          borderRadius: "8px",
          zIndex: 1000,
          opacity: 0.8,
        }}
      >
        <button
          onClick={exitModal}
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
      {videoText && (
        <div
          style={{
            position: "absolute",
            top: defaultSetting ? "20px" : "100px",
            ...(visualSettings || defaultSetting
              ? { left: "30px" }
              : { right: "30px" }),
            display: "flex",
            flexDirection: "column",
            gap: "15px", // spacing between the boxes
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(249, 247, 244, 0.6)",
              padding: "10px 25px 0px 25px",
              borderRadius: "8px",
              opacity: 0.8,
            }}
          >
            <h1
              style={{ color: "#901A36", fontWeight: "600", fontSize: "24px" }}
            >
              Øvelse
            </h1>
            <p
              style={{ fontWeight: "100", fontSize: "26px", maxWidth: "350px" }}
            >
              {program[currentIndex].name}
            </p>
          </div>

          {program[currentIndex].totalRepetitions && (
            <div
              style={{
                backgroundColor: "rgba(249, 247, 244, 0.6)",
                padding: "5px 25px 0px 25px",
                borderRadius: "8px",
                opacity: 0.8,
                width: "200px",
              }}
            >
              <h1
                style={{
                  color: "#901A36",
                  fontWeight: "600",
                  fontSize: "24px",
                }}
              >
                Repetition
              </h1>
              <p style={{ fontWeight: "100", fontSize: "26px" }}>
                {program[currentIndex].currentRepetition + 1}/
                {program[currentIndex].totalRepetitions}
              </p>
            </div>
          )}
        </div>
      )}
      <div
        className={`absolute bottom-5 ${
          visualSettings ? "left-5" : "right-5"
        } border-radius-5 overflow-hidden`}
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
