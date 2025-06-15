import { useState, useEffect, useRef } from "react";
import SettingOption from "../SettingOption";

export default function VisualsSettingModal({ isModalOpen, setIsModalOpen }) {
  const modalItem = useRef();

  useEffect(() => {
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
    <dialog className="fixed mt-[6%] bg-white rounded-xl z-10 w-[60vw] h-[60vh]" open={isModalOpen} ref={modalItem}>
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
          <SettingOption optionText="Venstre" optionIcon="left-smiley-red" />
          <SettingOption optionText="Standard" optionIcon="smiley-red" />
          <SettingOption optionText="Højre" optionIcon="right-smiley-red" />
        </div>
      </div>
    </dialog>
  );
}
