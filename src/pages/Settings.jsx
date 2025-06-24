import { useState } from "react";
import Menu from "../components/Menu";
import SettingItem from "../components/SettingItem";
import VisualNeglectSettingModal from "../components/modals/VisualNeglectSettingModal";

const Settings = () => {
  const [showModal, setShowmodal] = useState(false);

  return (
    <main className="bg-alt-color h-screen">
      <Menu />
      <VisualNeglectSettingModal setIsModalOpen={setShowmodal} isModalOpen={showModal} />
      <h1 className="text-font-color font-bold text-3xl text-center py-16">Indstillinger</h1>
      <div className="flex justify-center">
        <SettingItem
          text="Synsvanskeligheder"
          image="/assets/eye-icon.svg"
          imageOnHover="/assets/eye-icon-filled.svg"
          altText="eye icon"
          type="pop-up"
          onClick={() => setShowmodal(true)}
        />
      </div>
    </main>
  );
};

export default Settings;
