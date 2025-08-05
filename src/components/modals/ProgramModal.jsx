import { useState } from "react";
import Button from "../Button";
import InputField from "../InputField";

export default function ProgramModal({ showModal, setShowModal, onSubmit, editTitle, editDescription }) {
  const [title, setTitle] = useState(editTitle || "");
  const [description, setDescription] = useState(editDescription || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
    };
    onSubmit(data); // Send data back to parent
    setShowModal(false); // Close modal
    setTitle(""); // Reset title
    setDescription(""); // Reset description
  };
  return (
    <dialog className="fixed mt-[6%] bg-white rounded-xl z-10 w-[650px] h-[80vh]" open={showModal}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-full px-10">
        <h1 className="text-2xl font-bold">Gem program</h1>
        <div className="flex flex-col gap-4 my-4">
          <p>Når du gemmer et program, skal du give det et navn. Vær opmærksom på at navnet skal give mening for dig, så du kan skelne mellem de forskellige programmer.</p>
          <p>Vi anbefaler også, at du giver programmet en beskrivelse, som kan hjælpe dig med at huske indholdet af øvelser.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <InputField label="Angiv navn" id="program_title" type="text" required value={editTitle} setValue={setTitle} />
          <label for="program_description" className="flex items-center font-manjari text-lg font-bold">
            Angiv beskrivelse (valgfrit)
          </label>
          <textarea
            placeholder="Tilføj en beskrivelse (valgfrit)"
            id="program_description"
            name="program_description"
            rows="5"
            className="w-full bg-alt-color mb-4 rounded-[10px] text-xl pl-3 py-3"
            value={editDescription}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div></div>
          <div className="flex gap-5 justify-center">
            <Button type="button" text="Afbryd" variant="Cancel" onClick={() => setShowModal(false)} styling="px-5 text-xl h-10 pt-2" />
            <Button type="submit" text="Færdig" variant="Primary" styling="px-5 text-xl h-10 pt-2" />
          </div>
        </form>
      </div>
    </dialog>
  );
}
