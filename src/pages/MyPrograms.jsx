import React from "react";
import { useState } from "react";
import Menu from "../components/Menu";
import ProgramCard from "../components/ProgramCard";
import ActionModal from "../components/ActionModal";
const MyPrograms = () => {
  const [showCompletedModal, setShowCompletedModal] = useState(false);
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
        onSubmit={() => setShowCompletedModal(true)}
      >
        <p className="text-lg">Du er ved at slette dit program. Vil du fortsætte?</p>
      </ActionModal>
      <div className="pb-10 border-b-4 border-b-solid border-b-alt-color max-w-[1100px]">
        <h1 className="text-font-color font-bold text-3xl">Dine gemte programmer</h1>
        <p className="text-font-color text-xl my-3">Disse programmer er nogle du eller din tilknyttede terapeut tidligere har sammensat.</p>
        <div className="grid grid-cols-3 gap-6 w-full">
          <ProgramCard addShadow />
          <ProgramCard onDelete={() => setShowCompletedModal(true)} />
        </div>
      </div>
    </main>
  );
};

export default MyPrograms;
