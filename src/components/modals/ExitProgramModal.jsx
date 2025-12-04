import { useRef } from "react";
import Button from "../Button";

export default function ExitProgramModal({
  title,
  primaryButtonText,
  secondaryButtonText,
  icon,
  showModal,
  setShowModal,
  onAccept,
  onExit
}) {
  const dialogRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      // Clicked on backdrop
      onExit && onExit();
      setShowModal(false);
    }
  };

  if (!showModal) return null; // Prevent dialog from appearing before ready

  return (
    <div
      className="fixed inset-0 bg-black/40 z-10 flex items-center justify-center"
      onMouseDown={handleOutsideClick}
    >
      <dialog
        ref={dialogRef}
        className="bg-white rounded-xl w-[650px] h-[60vh] relative z-20"
        open
        onMouseDown={(e) => e.stopPropagation()} // prevent inside clicks from closing
      >
        {/* Exit button */}
        <button
          type="button"
          aria-label="Close"
          className="absolute top-4 right-4 p-2 rounded-full bg-red-100 hover:bg-red-200 text-black-600"
          onClick={() => {
            onExit && onExit();
            setShowModal(false);
          }}
        >
          <img src="/assets/fat-close-btn-icon.svg" alt="Close" className="w-6 h-6" />
        </button>

        <div className="absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-10">
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
    </div>
  );
}
