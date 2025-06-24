import { useState, useEffect } from "react";
import Menu from "../components/Menu";
import ProgramCard from "../components/ProgramCard";
import ActionModal from "../components/modals/ActionModal";
import { supabase } from "../DB/supabaseClient";
import { useNavigate } from "react-router-dom";

const MyPrograms = () => {
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [visualSettings] = useState(localStorage.getItem("visualNeglect") || "Standard");
  const navigate = useNavigate();

  async function getPrograms() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Failed to get user", error);
      return;
    }
    const { data, error: fetchError } = await supabase.from("Programs").select("name, description, id").eq("user_id", user.id);

    if (fetchError) {
      console.error("Error fetching programs:", fetchError);
      return;
    }
    console.log("Fetched programs:", data);
    return data;
  }
  useEffect(() => {
    async function fetchPrograms() {
      const data = await getPrograms();
      if (data) setPrograms(data);
    }
    fetchPrograms();
  }, []);
  console.log("Fetched programs:", programs);

  function deleteProgram(id) {
    supabase
      .from("Programs")
      .delete()
      .eq("id", id)
      .then(({ error }) => {
        if (error) {
          console.error("Error deleting program:", error);
        } else {
          setPrograms((prevPrograms) => prevPrograms.filter((program) => program.id !== id));
        }
      });
  }

  return (
    <main className="mx-20 my-12">
      <Menu />
      <ActionModal
        title="Slet program"
        cancelButtonText="Nej, afbryd"
        primaryButtonText="Ja, slet"
        icon="/assets/trashcan-black.svg"
        showModal={showCompletedModal}
        setShowModal={setShowCompletedModal}
        onCancel={() => setShowCompletedModal(false)}
        onAccept={() => {
          deleteProgram(selectedProgramId);
        }}
        onClose={() => setShowCompletedModal(false)}
      >
        <p className="text-lg">Du er ved at slette dit program. Vil du fortsætte?</p>
      </ActionModal>
      <div className={`flex flex-col pb-10 max-w-[1100px] ${visualSettings === "Venstre" && "items-end mx-auto"}`}>
        <h1 className="text-font-color font-bold text-3xl">Dine gemte programmer</h1>
        <p className="text-font-color text-xl my-3">Disse programmer er nogle du eller din tilknyttede terapeut tidligere har sammensat.</p>
        <div className={`flex flex-wrap ${visualSettings === "Venstre" && "flex-row-reverse justify-end"}gap-6 w-full`}>
          <ProgramCard addShadow />
          {programs.map((program) => (
            <ProgramCard
              title={program.name}
              description={program.description}
              duration="30"
              totalExercises="12"
              onDelete={() => {
                setSelectedProgramId(program.id);
                setShowCompletedModal(true);
              }}
              onPlay={() => {
                navigate(`/afspil/${program.id}`);
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyPrograms;
