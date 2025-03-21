import Button from "./Button";
import InputField from "./InputField";

export default function ProgramModal({ showModal, setShowModal }) {
  return (
    <dialog className="fixed mt-[6%] bg-white rounded-xl z-10 w-[650px] h-[570px]" open={showModal}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-full px-10">
        <h1 className="text-2xl">Gem program</h1>
        <div>
          <p>Når du gemmer et program, skal du give det et navn. Vær opmærksom på at navnet skal give mening for dig, så du kan skelne mellem de forskellige programmer.</p>
          <p>Vi anbefaler også, at du giver programmet en beskrivelse, som kan hjælpe dig med at huske indholdet af øvelser.</p>
        </div>
        <form>
          <InputField label="Navngiv dit program" id="program_title" type="text" required />
          <label for="program_description">Beskrivelse (valgfrit)</label>
          <textarea placeholder="Tilføj en beskrivelse (valgfrit)" id="program_description" name="program_description" rows="6"></textarea>

          <div></div>
          <div>
            <Button type="button" text="Fortryd" onClick={() => setShowModal(false)} variant="red fullWidth small back-button" />
            <Button type="submit" text="Gem" variant="green fullWidth small " />
          </div>
        </form>
      </div>
    </dialog>
  );
}
