import React from "react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../DB/supabaseClient"; // Import Supabase client
import LandingPageLayout from "../components/LandingPageLayout";
import Button from "../components/Button";
import InputField from "../components/InputField";
import BackgroundImage from "../components/BackgroundImage";

const SignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorDisplayed, setErrorDisplayed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { display_name: fullName },
      },
    });

    if (error) {
      console.error("Error signing up:", error.message);
      setMessage("Fejl ved oprettelse af bruger: " + error.message);
    }

    if (data && !error) {
      console.log("User signed up successfully:", data);
      setMessage("Bruger oprettet. Tjek din email for at bekræfte din konto.");

      window.location.href = "/log-ind"; // Redirect user after signup
    }

    console.log(message);
    setEmail("");
    setPassword("");
    setPasswordRepeat("");
    setFullName("");
  };

  const modalItem = useRef();

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
  useEffect(() => {
    const handler = (event) => {
      if (!modalItem.current) {
        return;
      }
      if (!modalItem.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <LandingPageLayout>
      <dialog open={isModalOpen} ref={modalItem} className="w-80 rounded-xl border-2 border-solid border-black fixed  top-1/2 -translate-y-1/2  p-4 z-50">
        <div onClick={() => setIsModalOpen(false)} className="flex justify-end w-full mb-3">
          <img src="/assets/x-red.svg" alt="red x" className="w-6 cursor-pointer" />
        </div>
        <p className="text-lg mb-2">Din adgangskode skal bestå af:</p>
        <ul className="text-lg list-disc ml-6">
          <li>Mindst 8 tegn</li>
          <li>Mindst et lille bogstav</li>
          <li>Mindst et stort bogstav</li>
          <li>Mindst et tal</li>
        </ul>
      </dialog>
      <BackgroundImage />
      <div className="w-80 mt-16">
        <h1 className="text-2xl mb-3 text-primary font-bold">Opret bruger:</h1>
        <form onSubmit={handleSubmit}>
          <InputField label="Brugernavn (email)" id="user-email" type="email"
           required value={email} setValue={setEmail} />
          <InputField
            label="Adgangskode"
            id="user-password"
            type="password"
            icon="info-icon"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required
            value={password}
            setValue={setPassword}
            onIconMouseOver={() => {
              setIsModalOpen(true);
            }}
          />
          <InputField
            label="Gentag adgangskode"
            id="repeatPassword"
            type="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required
            value={passwordRepeat}
            setValue={setPasswordRepeat}
          />
          <div>{errorDisplayed && <h2 className="mt-2 text-lg text-primary max-w-64 font-bold">{errorMessage}</h2>}</div>
          <div className="flex w-full gap-5 mt-8">
            <Button variant="Cancel" text="Afbryd" href=".." styling="text-2xl pt-[10px] h-12" fullWidth />
            <Button
              type="submit"
              text="Fortsæt"
              variant="Primary"
              styling="text-2xl pt-[10px] h-12"
              onClick={() => {
                displayErrorMessage();
              }}
              fullWidth
            />
          </div>
        </form>
      </div>
    </LandingPageLayout>
  );
};

export default SignUp;
