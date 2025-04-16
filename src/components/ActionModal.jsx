import Button from "./Button";
export default function ActionModal({ title, cancelButtonText, primaryButtonText, icon, children, showModal, setShowModal, onAccept }) {
  return (
    <dialog className="fixed mt-[6%] bg-white rounded-xl z-20 w-[650px] h-[60vh]" open={showModal}>
      <div className="absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-full px-10">
        <img src={icon} alt="icon" className="w-24 m-auto mb-8" />
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex flex-col gap-4 my-4">{children}</div>
        <div className="flex gap-5 justify-center mt-10">
          <Button type="button" text={cancelButtonText} variant="Cancel" onClick={() => setShowModal(false)} styling="px-2 min-w-36 text-3xl h-14 pt-3" />
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
