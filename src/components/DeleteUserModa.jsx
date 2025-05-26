import React from "react";
import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";

export default function DeleteUserModal({ showModal, setShowModal }) {
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [password, setPassword] = useState("");
  return (
    <dialog className="fixed mt-[6%] bg-white rounded-xl w-[650px] h-[70vh] z-30" open={showModal}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-full px-40">
        <h1 className="text-2xl font-bold text-center text-primary mb-4">Slet bruger</h1>
        <form>
          <div className="mb-6 text-center">
            <p>Du er nu i gang med at slette din bruger permanent.</p>
            <p>For at bekræfte sletningen af din bruger skal du skrive din adgangskode.</p>
          </div>
          <InputField label="Brugernavn (mail)" id="email" type="text" required value={email} setValue={setEmail} />
          <InputField label="Adgangskode" id="password" type="text" required value={password} setValue={setPassword} />
          <div className="flex gap-5 justify-center mb-3">
            <Button fullWidth type="button" text="Afbryd" variant="Cancel" onClick={() => setShowModal(false)} styling="px-5 text-xl h-10 pt-2" />
            <Button
              fullWidth
              type="submit"
              text="Bekræft"
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
