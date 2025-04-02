import Button from "./Button";
export default function CompletedModal({ showModal, setShowModal }) {
  return (
    <dialog className="fixed mt-[6%] bg-white rounded-xl z-10 w-[650px] h-[70vh]" open={showModal}>
      <div className="absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-full px-10">
        <img src="/assets/bookmark-red.svg" alt="bookmark icon" className="w-24 m-auto mb-8" />
        <h1 className="text-2xl font-bold">Dit program er nu gemt!</h1>
        <div className="flex flex-col gap-4 my-4">
          <p>Du kan finde dine gemte programmer under "Mine programmer".</p>
          <p>Vil du fortsætte til siden?</p>
        </div>
        <div></div>
        <div className="flex gap-5 justify-center mt-10">
          <Button type="button" text="Nej" variant="Cancel" onClick={() => setShowModal(false)} styling="w-40 text-xl h-10 pt-2" />
          <Button type="button" text="Ja" variant="Primary" styling="w-40 text-xl h-10 pt-2" onClick={() => setShowModal(false)} />
        </div>
      </div>
    </dialog>
  );
}
