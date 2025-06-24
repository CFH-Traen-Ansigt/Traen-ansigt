import { useState, useEffect, useRef } from "react";
import { supabase } from "../../DB/supabaseClient";
import SettingOption from "../SettingOption";

export default function VisualNeglectSettingModal({ isModalOpen, setIsModalOpen }) {
  const [visualNeglectOption, setVisualNeglectOption] = useState("Standard");
  const modalItem = useRef();

  async function getSetting() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Failed to get user", error);
      return;
    }

    const userId = user.id;
    const { data, error: fetchError } = await supabase.from("Settings").select("visual_neglect, id").eq("user_id", userId);

    if (fetchError) {
      console.error("Error fetching programs:", fetchError);
      return;
    }
    if (data.length < 1) {
      const { error: insertError, data: insertData } = await supabase.from("Settings").insert({
        user_id: userId,
        visual_neglect: visualNeglectOption || "Standard",
      });

      if (insertError) {
        console.error("Error inserting setting:", insertError);
        return;
      }
      console.log("Inserted new setting row:", insertData);
    }
    console.log("Fetched setting:", data[0].visual_neglect);
    setVisualNeglectOption(data[0].visual_neglect);
  }

  useEffect(() => {
    getSetting();

    const handler = (event) => {
      if (!modalItem.current) {
        return;
      }
      if (!modalItem.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <dialog className="fixed mt-[6%] bg-white rounded-xl z-10 w-[800px] h-[60vh]" open={isModalOpen} ref={modalItem}>
      <div className="absolute left-1/2 transform -translate-x-1/2 w-full px-10 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto">
            <img src="/assets/eye-icon-filled.svg" alt="eye icon" className="w-16 bg-main-color py-4 px-1" />
            <h2 className="text-2xl text-primary font-bold pt-4">Synsvanskeligheder</h2>
          </div>
          <img onClick={() => setIsModalOpen(false)} src="/assets/x-red.svg" alt="red x" className="w-10 cursor-pointer" />
        </div>
        <p className="mt-8 mb-6">
          Når du vælger venstre- eller højresidet synsvanskligheder som din indstilling, vil de vigtigeste funktioner blive rykket til den modsate side af skærmen herunder:
        </p>
        <p>Live video feedback, menu, og øvrig vigtig information.</p>
        <div className="flex justify-between mt-6 gap-4">
          <SettingOption
            optionText="Venstre"
            iconInFocus="left-smiley"
            iconOutOfFocus="left-smiley-red"
            settingOption={visualNeglectOption}
            setSettingOption={setVisualNeglectOption}
          />
          <SettingOption optionText="Standard" iconInFocus="smiley" iconOutOfFocus="smiley-red" settingOption={visualNeglectOption} setSettingOption={setVisualNeglectOption} />
          <SettingOption
            optionText="Højre"
            iconInFocus="right-smiley"
            iconOutOfFocus="right-smiley-red"
            settingOption={visualNeglectOption}
            setSettingOption={setVisualNeglectOption}
          />
        </div>
      </div>
    </dialog>
  );
}
