import Button from "./Button";
import InputField from "./InputField";
export default function PersonalInfoModal({ showModal, setShowModal }) {
  return (
    <dialog className="fixed mt-[6%] bg-white rounded-xl w-[650px] h-[60vh] z-30" open={showModal}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-full px-40">
        <h1 className="text-2xl font-bold text-primary mb-10">Rediger personinformation</h1>
        <form>
          <InputField label="Fulde navn" id="full name" type="text" required />
          <InputField label="Email" id="email" type="text" required />
          <div></div>
          <div className="flex gap-5 justify-center">
            <Button fullWidth type="button" text="Afbryd" variant="Cancel" onClick={() => setShowModal(false)} styling="px-5 text-xl h-10 pt-2" />
            <Button
              fullWidth
              type="submit"
              text="Gem"
              variant="Primary"
              styling="px-5 text-xl h-10 pt-2"
              onClick={() => {
                setShowModal(false);
              }}
            />
          </div>
        </form>
      </div>
    </dialog>
  );
}
