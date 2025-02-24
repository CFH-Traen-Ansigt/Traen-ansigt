import React from "react";
import { useState } from "react";
import LandingPageLayout from "../components/LandingPageLayout";
import Button from "../components/Button";
import InputField from "../components/InputField";
import BackgroundImage from "../components/BackgroundImage";

const SignUp = () => {
  const [errorDisplayed, setErrorDisplayed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;

  function displayErrorMessage() {
    if (password !== passwordRepeat) {
      setErrorDisplayed(true);
      setErrorMessage("Adgangskoder matcher ikke");
    } else if (!password.match(lowerCaseLetters) || !password.match(upperCaseLetters)) {
      setErrorDisplayed(true);
      setErrorMessage("Adgangskoden skal indeholde store og små bogstaver");
    } else if (!password.match(numbers)) {
      setErrorDisplayed(true);
      setErrorMessage("Adgangskoden skal indeholde tal");
    } else if (password.length < 8) {
      setErrorDisplayed(true);
      setErrorMessage("Adgangskoden skal indeholde mindst 8 tegn");
    } else {
      setErrorDisplayed(false);
    }
  }
  return (
    <LandingPageLayout>
      <dialog className="w-3xs rounded-xl">
        <div onClick={() => document.querySelector(".password-dialog").close()}>
          <img src="/assets/x-red.svg" alt="red x" className="w-8 cursor-pointer" />
        </div>
        <p>Din adgangskode skal bestå af:</p>
        <ul className="text-sm">
          <li>Mindst 8 tegn</li>
          <li>Mindst et lille bogstav</li>
          <li>Mindst et stort bogstav</li>
          <li>Mindst et tal</li>
        </ul>
      </dialog>
      <BackgroundImage />
      <div className="w-80 mt-20">
        <h1 className="text-2xl mb-3 text-primary font-bold">Opret bruger:</h1>
        <form>
          <InputField label="Brugernavn" id="username" type="text" required />
          <InputField
            label="Adgangskode"
            id="password"
            type="password"
            variant="password"
            icon="info-icon"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required
            value={password}
            setValue={setPassword}
          />
          <InputField
            label="Gentag adgangskode"
            id="repeatPassword"
            type="password"
            variant="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required
            value={passwordRepeat}
            setValue={setPasswordRepeat}
          />
          <div>{errorDisplayed && <h2 className="mt-2 text-lg text-primary max-w-64 font-bold">{errorMessage}</h2>}</div>
          <div className="flex w-full gap-5 mt-8">
            <Button variant="Cancel" text="Afbryd" href=".." styling="text-2xl pt-[10px]" />
            <Button
              text="Fortsæt"
              variant="Primary"
              styling="text-2xl pt-[10px]"
              onClick={() => {
                displayErrorMessage();
              }}
            />
          </div>
        </form>
      </div>
    </LandingPageLayout>
  );
};

export default SignUp;
