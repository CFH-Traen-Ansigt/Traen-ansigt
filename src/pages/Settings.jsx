import { useState } from "react";
import { supabase } from "../DB/supabaseClient";
import Menu from "../components/Menu";
import SettingItem from "../components/SettingItem";
import VisualNeglectSettingModal from "../components/modals/VisualNeglectSettingModal";

const Settings = () => {
  const [showModal, setShowmodal] = useState(false);
  const [videoText, setVideoText] = useState(JSON.parse(localStorage.getItem("videoText")) || false);

  async function videoTextSetting(setSetting) {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Failed to get user", error);
      return;
    }
    const userId = user.id;
    console.log("Setting to save:", setSetting);
    try {
      const { error1 } = await supabase.from("Settings").update({ video_text: setSetting }).eq("user_id", userId);
      localStorage.setItem("videoText", setSetting);
      if (error1) {
        console.error("Error saving setting:", error1);
      }
    } catch (error) {
      console.error("Error saving program:", error);
    }
  }
  return (
    <main className="bg-alt-color h-screen">
      <Menu visualSetting={localStorage.getItem("visualNeglect")} />
      <VisualNeglectSettingModal setIsModalOpen={setShowmodal} isModalOpen={showModal} />
      <h1 className="text-font-color font-bold text-3xl text-center py-16">Indstillinger</h1>
      <div className="flex justify-center gap-6">
        <SettingItem
          text="Synsvanskeligheder"
          icon="/assets/eye-icon.svg"
          iconOnHover="/assets/eye-icon-filled.svg"
          altText="eye icon"
          type="pop-up"
          onClick={() => setShowmodal(true)}
        />
        <SettingItem
          text="Hjælpetekst: "
          icon="/assets/text-icon.svg"
          iconOnHover="/assets/text-icon-filled.svg"
          settingIsOn={videoText}
          altText="eye icon"
          type="pop-up"
          onClick={() => {
            videoTextSetting(!videoText);
            setVideoText((old) => !old);
          }}
        />
      </div>
    </main>
  );
};

export default Settings;
