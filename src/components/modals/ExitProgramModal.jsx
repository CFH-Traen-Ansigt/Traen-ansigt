import Button from "../Button";
export default function ExitProgramModal({ title, primaryButtonText, secondaryButtonText, icon, showModal, setShowModal, onAccept, onExit }) {
  return (
    <dialog className="fixed mt-[6%] bg-white rounded-xl z-20 w-[650px] h-[60vh]" open={showModal}>
      {/* Exit button in the corner */}
      <button
        type="button"
        aria-label="Close"
        className="absolute top-4 right-4 p-2 rounded-full bg-red-300 hover:bg-red-500 text-black-600"
        onClick={() => {
          onExit && onExit();
          setShowModal(false);
        }
        }
      >
        <img src="\assets\fat-close-btn-icon.svg" alt="Close" className="w-6 h-6" />
      </button>

      <div className="absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-full px-10">
        <img src={icon} alt="Exit Program" className="w-33 m-auto mb-8" />
        <h1 className="text-3xl font-bold">{title}</h1>
        <h4 className="text-xl">Du er ved at forlade dit program, vil du fortsætte?</h4>
        <div className="flex gap-5 justify-center mt-7">
          <Button
            type="button"
            text={secondaryButtonText}
            variant="Cancel"
            styling="px-5 min-w-40 text-3xl h-14 pt-3"
            onClick={() => {
              onExit && onExit();
              setShowModal(false);
            }}
           />
          <Button
            type="button"
            text={primaryButtonText}
            variant="Primary"
            styling="px-5 min-w-40 text-3xl h-14 pt-3"
            onClick={() => {
              onAccept && onAccept();
              setShowModal(false);
            }}
          />
        </div>
      </div>
    </dialog>
  );
}